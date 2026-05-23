"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
const electron = require("electron");
const node_path = require("node:path");
const promises = require("node:fs/promises");
const utils = require("@electron-toolkit/utils");
const node_os = require("node:os");
const Piscina = require("piscina");
const Database = require("better-sqlite3");
const node_crypto = require("node:crypto");
const sharp = require("sharp");
const hashWorker = require("./hash-worker.js");
const pngjs = require("pngjs");
const sync = require("csv-stringify/sync");
require("node:fs");
const SUPPORTED_EXTENSIONS = /* @__PURE__ */ new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".heic",
  ".tiff",
  ".tif",
  ".bmp",
  ".gif"
]);
const IPC_CHANNELS = {
  SELECT_FOLDERS: "scan:select-folders",
  SCAN_START: "scan:start",
  SCAN_CANCEL: "scan:cancel",
  SCAN_PROGRESS: "scan:progress",
  SCAN_RESULTS: "scan:results",
  ACTION_DELETE: "action:delete",
  ACTION_UNDO: "action:undo",
  COMPARE_IMAGES: "compare:images",
  EXPORT_CSV: "export:csv",
  THUMBNAIL_GET: "thumbnail:get"
};
async function scanDirectories(directories, onProgress, signal) {
  const results = [];
  let scannedCount = 0;
  for (const dir of directories) {
    if (signal?.aborted) break;
    await walkDirectory(dir, results, onProgress, signal, () => ++scannedCount);
  }
  return results;
}
async function walkDirectory(dirPath, results, onProgress, signal, incrementCount) {
  if (signal?.aborted) return;
  try {
    const entries = await promises.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (signal?.aborted) return;
      const fullPath = node_path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        await walkDirectory(fullPath, results, onProgress, signal, incrementCount);
      } else if (entry.isFile()) {
        const ext = node_path.extname(entry.name).toLowerCase();
        if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
        try {
          const fileStat = await promises.stat(fullPath);
          const scannedFile = {
            path: fullPath,
            name: node_path.basename(entry.name),
            size: fileStat.size,
            modifiedAt: fileStat.mtime.toISOString()
          };
          results.push(scannedFile);
          const count = incrementCount?.() ?? results.length;
          onProgress?.(count, fullPath);
        } catch (err) {
          const code = err.code;
          console.warn(`[Scanner] Skipping unreadable file: ${fullPath} (${code})`);
        }
      }
    }
  } catch (err) {
    const code = err.code;
    if (code === "EACCES" || code === "EPERM" || code === "ENOENT") {
      console.warn(`[Scanner] Skipping inaccessible directory: ${dirPath} (${code})`);
      return;
    }
    throw err;
  }
}
let db;
function initDB() {
  const dbPath = node_path.join(electron.app.getPath("userData"), "scan-cache.db");
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.exec(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      mtime TEXT NOT NULL,
      size INTEGER NOT NULL,
      sha256 TEXT NOT NULL,
      phash TEXT NOT NULL,
      width INTEGER NOT NULL,
      height INTEGER NOT NULL,
      format TEXT NOT NULL,
      thumbnailPath TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);
  db.exec(`
    CREATE TABLE IF NOT EXISTS thumbnails (
      hash TEXT PRIMARY KEY,
      lastAccessed INTEGER NOT NULL
    )
  `);
}
function closeDB() {
  if (db) {
    db.close();
  }
}
function getFileCache(filePath, mtime, size) {
  if (!db) return null;
  const stmt = db.prepare("SELECT * FROM files WHERE path = ?");
  const row = stmt.get(filePath);
  if (row && row.mtime === mtime && row.size === size) {
    return {
      filePath: row.path,
      fileName: filePath.split(/[\\/]/).pop() || "",
      sha256: row.sha256,
      phash: row.phash,
      width: row.width,
      height: row.height,
      format: row.format,
      size: row.size,
      thumbnailPath: row.thumbnailPath,
      createdAt: row.createdAt
    };
  }
  return null;
}
function saveFileCache(img, mtime) {
  if (!db || img.error || !img.sha256) return;
  const stmt = db.prepare(`
    INSERT INTO files (path, mtime, size, sha256, phash, width, height, format, thumbnailPath, createdAt)
    VALUES (@path, @mtime, @size, @sha256, @phash, @width, @height, @format, @thumbnailPath, @createdAt)
    ON CONFLICT(path) DO UPDATE SET
      mtime = excluded.mtime,
      size = excluded.size,
      sha256 = excluded.sha256,
      phash = excluded.phash,
      width = excluded.width,
      height = excluded.height,
      format = excluded.format,
      thumbnailPath = excluded.thumbnailPath,
      createdAt = excluded.createdAt
  `);
  stmt.run({
    path: img.filePath,
    mtime,
    size: img.size,
    sha256: img.sha256,
    phash: img.phash,
    width: img.width,
    height: img.height,
    format: img.format,
    thumbnailPath: img.thumbnailPath,
    createdAt: img.createdAt
  });
  updateThumbnailAccess(img.sha256);
}
function updateThumbnailAccess(sha256) {
  if (!db || !sha256) return;
  const now = Date.now();
  const stmt = db.prepare(`
    INSERT INTO thumbnails (hash, lastAccessed)
    VALUES (?, ?)
    ON CONFLICT(hash) DO UPDATE SET lastAccessed = excluded.lastAccessed
  `);
  stmt.run(sha256, now);
}
async function cleanupThumbnails(thumbnailDir2, maxAgeMs = 30 * 24 * 60 * 60 * 1e3) {
  if (!db) return 0;
  const cutoff = Date.now() - maxAgeMs;
  const stmt = db.prepare("SELECT hash FROM thumbnails WHERE lastAccessed < ?");
  const rows = stmt.all(cutoff);
  let deletedCount = 0;
  const deleteStmt = db.prepare("DELETE FROM thumbnails WHERE hash = ?");
  for (const row of rows) {
    const thumbPath = node_path.join(thumbnailDir2, `${row.hash}.webp`);
    try {
      await promises.rm(thumbPath, { force: true });
      deleteStmt.run(row.hash);
      deletedCount++;
    } catch (err) {
      console.warn(`[DB] Failed to delete old thumbnail ${thumbPath}:`, err);
    }
  }
  return deletedCount;
}
class HasherService {
  pool;
  /**
   * @param workerPath - Absolute path to the compiled hash-worker.js file.
   *   In production this is resolved from the app's output directory.
   * @param maxThreads - Maximum number of worker threads (defaults to half the CPU cores)
   */
  constructor(workerPath, maxThreads) {
    const resolvedWorkerPath = workerPath ?? node_path.join(__dirname, "hash-worker.js");
    this.pool = new Piscina({
      filename: resolvedWorkerPath,
      maxThreads: maxThreads ?? Math.max(1, Math.floor(node_os.cpus().length / 2)),
      idleTimeout: 3e4
    });
  }
  /**
   * Processes an array of file paths through the worker pool.
   * Each file gets hashed, its metadata extracted, and a thumbnail generated.
   *
   * @param files - Array of ScannedFile objects to process
   * @param thumbnailDir - Directory where thumbnails should be saved
   * @param onProgress - Optional callback invoked after each file completes
   * @param signal - Optional AbortSignal to cancel processing mid-flight
   * @returns Array of HashedImage results (may include entries with errors)
   */
  async hashFiles(files, thumbnailDir2, onProgress, signal) {
    const total = files.length;
    const results = [];
    let completed = 0;
    const taskPromises = files.map(async (file) => {
      const { path: filePath, modifiedAt: mtime, size } = file;
      if (signal?.aborted) {
        return null;
      }
      const cached = getFileCache(filePath, mtime, size);
      if (cached) {
        completed++;
        onProgress?.(completed, total, filePath);
        return cached;
      }
      try {
        const result = await this.pool.run(
          { filePath, thumbnailDir: thumbnailDir2 },
          { signal }
        );
        if (!result.error && result.sha256) {
          saveFileCache(result, mtime);
        }
        completed++;
        onProgress?.(completed, total, filePath);
        return result;
      } catch (err) {
        if (err.name === "AbortError") {
          return null;
        }
        completed++;
        const errorResult = {
          filePath,
          fileName: filePath.split(/[\\/]/).pop() ?? "",
          sha256: "",
          phash: "",
          width: 0,
          height: 0,
          format: "unknown",
          size: 0,
          thumbnailPath: "",
          createdAt: "",
          error: err instanceof Error ? err.message : String(err)
        };
        onProgress?.(completed, total, filePath);
        return errorResult;
      }
    });
    const settledResults = await Promise.all(taskPromises);
    for (const result of settledResults) {
      if (result !== null) {
        results.push(result);
      }
    }
    return results;
  }
  /**
   * Destroys the worker pool, cleaning up threads.
   * Should be called when the hasher is no longer needed.
   */
  async destroy() {
    await this.pool.destroy();
  }
  /**
   * Returns the number of tasks currently queued in the worker pool.
   */
  get queueSize() {
    return this.pool.queueSize;
  }
}
const MAX_HAMMING_DISTANCE = 64;
function hammingDistance(hashA, hashB) {
  if (!hashA || !hashB) return MAX_HAMMING_DISTANCE;
  let distance = 0;
  const len = Math.min(hashA.length, hashB.length);
  for (let i = 0; i < len; i++) {
    const a = parseInt(hashA[i], 16);
    const b = parseInt(hashB[i], 16);
    let xor = a ^ b;
    while (xor > 0) {
      distance += xor & 1;
      xor >>= 1;
    }
  }
  return distance;
}
class BKNode {
  hash;
  children;
  constructor(hash) {
    this.hash = hash;
    this.children = /* @__PURE__ */ new Map();
  }
}
class BKTree {
  root = null;
  /**
   * Adds a new hash to the tree.
   * @param hash - Hexadecimal hash string
   */
  add(hash) {
    if (!this.root) {
      this.root = new BKNode(hash);
      return;
    }
    let current = this.root;
    while (true) {
      const distance = hammingDistance(current.hash, hash);
      if (distance === 0) return;
      const child = current.children.get(distance);
      if (child) {
        current = child;
      } else {
        current.children.set(distance, new BKNode(hash));
        return;
      }
    }
  }
  /**
   * Searches for hashes within a given Hamming distance.
   * @param hash - Target hash to search around
   * @param threshold - Maximum allowed distance
   * @returns Array of hashes that match the criteria
   */
  search(hash, threshold) {
    const results = [];
    if (!this.root) return results;
    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      const distance = hammingDistance(current.hash, hash);
      if (distance <= threshold) {
        results.push(current.hash);
      }
      const minDistance = distance - threshold;
      const maxDistance = distance + threshold;
      for (const [childDist, childNode] of current.children) {
        if (childDist >= minDistance && childDist <= maxDistance) {
          queue.push(childNode);
        }
      }
    }
    return results;
  }
}
const DEFAULT_SIMILARITY_THRESHOLD = 5;
function groupDuplicates(images, similarityThreshold = DEFAULT_SIMILARITY_THRESHOLD) {
  const validImages = images.filter((img) => !img.error && img.sha256);
  const groups = [];
  const assignedToExactGroup = /* @__PURE__ */ new Set();
  const sha256Map = /* @__PURE__ */ new Map();
  for (const img of validImages) {
    const existing = sha256Map.get(img.sha256);
    if (existing) {
      existing.push(img);
    } else {
      sha256Map.set(img.sha256, [img]);
    }
  }
  for (const [, groupImages] of sha256Map) {
    if (groupImages.length < 2) continue;
    for (const img of groupImages) {
      assignedToExactGroup.add(img.filePath);
    }
    const ranked = rankImages(groupImages);
    const spaceSavings = calculateSpaceSavings(ranked);
    groups.push({
      id: node_crypto.randomUUID(),
      type: "exact",
      similarity: 100,
      spaceSavings,
      images: ranked
    });
  }
  const candidates = validImages.filter(
    (img) => img.phash && !assignedToExactGroup.has(img.filePath)
  );
  const tree = new BKTree();
  for (const c of candidates) {
    tree.add(c.phash);
  }
  const assignedToSimilarGroup = /* @__PURE__ */ new Set();
  const similarGroups = [];
  for (let i = 0; i < candidates.length; i++) {
    const current = candidates[i];
    if (assignedToSimilarGroup.has(current.filePath)) continue;
    const similarHashes = tree.search(current.phash, similarityThreshold);
    const similarSet = new Set(similarHashes);
    const group = candidates.filter(
      (c) => similarSet.has(c.phash) && !assignedToSimilarGroup.has(c.filePath)
    );
    if (group.length >= 2) {
      similarGroups.push(group);
      for (const g of group) {
        assignedToSimilarGroup.add(g.filePath);
      }
    }
  }
  for (const groupImages of similarGroups) {
    const ranked = rankImages(groupImages);
    const similarity = calculateGroupSimilarity(ranked);
    const spaceSavings = calculateSpaceSavings(ranked);
    groups.push({
      id: node_crypto.randomUUID(),
      type: "similar",
      similarity,
      spaceSavings,
      images: ranked
    });
  }
  groups.sort((a, b) => b.spaceSavings - a.spaceSavings);
  return groups;
}
function rankImages(images) {
  if (images.length === 0) return [];
  let maxRes = 0, maxSize = 0, maxAge = 0, maxBlur = 0;
  const now = Date.now();
  const intermediate = images.map((img) => {
    const resolution = img.width * img.height;
    const age = now - (img.createdAt ? new Date(img.createdAt).getTime() : now);
    const blur = img.blurScore || 0;
    if (resolution > maxRes) maxRes = resolution;
    if (img.size > maxSize) maxSize = img.size;
    if (age > maxAge) maxAge = age;
    if (blur > maxBlur) maxBlur = blur;
    return { ...img, resolution, age, blur };
  });
  const scored = intermediate.map((img) => {
    const resScore = maxRes ? img.resolution / maxRes * 40 : 0;
    const sizeScore = maxSize ? img.size / maxSize * 30 : 0;
    const ageScore = maxAge ? img.age / maxAge * 20 : 0;
    const blurScore = maxBlur ? img.blur / maxBlur * 10 : 0;
    const totalScore = resScore + sizeScore + ageScore + blurScore;
    return {
      ...img,
      isOriginal: false,
      rank: 0,
      totalScore
    };
  });
  scored.sort((a, b) => b.totalScore - a.totalScore);
  for (let i = 0; i < scored.length; i++) {
    scored[i].rank = i + 1;
    scored[i].isOriginal = i === 0;
  }
  return scored;
}
function calculateGroupSimilarity(images) {
  if (images.length < 2) return 100;
  let totalDistance = 0;
  let pairs = 0;
  const reference = images[0];
  for (let i = 1; i < images.length; i++) {
    totalDistance += hammingDistance(reference.phash, images[i].phash);
    pairs++;
  }
  if (pairs === 0) return 100;
  const avgDistance = totalDistance / pairs;
  const similarity = Math.round((MAX_HAMMING_DISTANCE - avgDistance) / MAX_HAMMING_DISTANCE * 100);
  return Math.max(0, Math.min(100, similarity));
}
function calculateSpaceSavings(ranked) {
  if (ranked.length < 2) return 0;
  return ranked.slice(1).reduce((sum, img) => sum + img.size, 0);
}
const VISUAL_SIMILARITY_THRESHOLD = 10;
const COMPARE_SIZE = 256;
async function compareImages(pathA, pathB) {
  const [bufferA, bufferB] = await Promise.all([
    readImageBuffer(pathA),
    readImageBuffer(pathB)
  ]);
  const sha256A = node_crypto.createHash("sha256").update(bufferA).digest("hex");
  const sha256B = node_crypto.createHash("sha256").update(bufferB).digest("hex");
  if (sha256A === sha256B) {
    return {
      type: "exact",
      similarity: 100,
      hammingDistance: 0
    };
  }
  const [phashA, phashB] = await Promise.all([
    hashWorker.computeDhash(bufferA),
    hashWorker.computeDhash(bufferB)
  ]);
  const distance = hammingDistance(phashA, phashB);
  const similarity = Math.round((64 - distance) / 64 * 100);
  let diffImageBase64;
  try {
    diffImageBase64 = await generatePixelDiff(bufferA, bufferB);
  } catch (err) {
    console.warn("[Comparator] Pixel diff generation failed:", err.message);
  }
  const type = distance <= VISUAL_SIMILARITY_THRESHOLD ? "visual" : "different";
  return {
    type,
    similarity,
    hammingDistance: distance,
    diffImageBase64
  };
}
async function readImageBuffer(filePath) {
  const raw = await promises.readFile(filePath);
  const ext = node_path.extname(filePath).toLowerCase();
  if (ext === ".heic") {
    const heicConvert = (await import("heic-convert")).default;
    const result = await heicConvert({
      buffer: raw,
      format: "JPEG",
      quality: 0.92
    });
    return Buffer.from(result);
  }
  return raw;
}
async function generatePixelDiff(bufferA, bufferB) {
  const [rawA, rawB] = await Promise.all([
    sharp(bufferA).resize(COMPARE_SIZE, COMPARE_SIZE, { fit: "fill" }).ensureAlpha().raw().toBuffer(),
    sharp(bufferB).resize(COMPARE_SIZE, COMPARE_SIZE, { fit: "fill" }).ensureAlpha().raw().toBuffer()
  ]);
  const diffPixels = new Uint8Array(COMPARE_SIZE * COMPARE_SIZE * 4);
  const pixelmatch = (await import("pixelmatch")).default;
  pixelmatch(
    new Uint8Array(rawA.buffer, rawA.byteOffset, rawA.byteLength),
    new Uint8Array(rawB.buffer, rawB.byteOffset, rawB.byteLength),
    diffPixels,
    COMPARE_SIZE,
    COMPARE_SIZE,
    { threshold: 0.1, alpha: 0.1, includeAA: true }
  );
  const diffPng = new pngjs.PNG({ width: COMPARE_SIZE, height: COMPARE_SIZE });
  diffPng.data = Buffer.from(diffPixels);
  const pngBuffer = pngjs.PNG.sync.write(diffPng);
  return `data:image/png;base64,${pngBuffer.toString("base64")}`;
}
const CSV_COLUMNS = [
  "Group",
  "Type",
  "FileName",
  "Path",
  "Size (bytes)",
  "Resolution",
  "SHA256",
  "Similarity (%)",
  "Status"
];
async function exportToCSV(groups, parentWindow) {
  const result = await electron.dialog.showSaveDialog(parentWindow ?? {}, {
    title: "Export Duplicate Report",
    defaultPath: `duplicate-report-${formatDateForFilename()}.csv`,
    filters: [
      { name: "CSV Files", extensions: ["csv"] },
      { name: "All Files", extensions: ["*"] }
    ]
  });
  if (result.canceled || !result.filePath) {
    return null;
  }
  const rows = [];
  for (let groupIndex = 0; groupIndex < groups.length; groupIndex++) {
    const group = groups[groupIndex];
    const groupLabel = `Group ${groupIndex + 1}`;
    for (const image of group.images) {
      rows.push([
        groupLabel,
        group.type,
        image.fileName,
        image.filePath,
        String(image.size),
        `${image.width}×${image.height}`,
        image.sha256,
        String(group.similarity),
        image.isOriginal ? "Keep (Original)" : "Duplicate"
      ]);
    }
  }
  const csvContent = sync.stringify(rows, {
    header: true,
    columns: CSV_COLUMNS,
    bom: true
    // Add BOM for Excel compatibility
  });
  await promises.writeFile(result.filePath, csvContent, "utf-8");
  return result.filePath;
}
function formatDateForFilename() {
  const now = /* @__PURE__ */ new Date();
  const date = now.toISOString().slice(0, 10);
  const time = now.toTimeString().slice(0, 8).replace(/:/g, "");
  return `${date}_${time}`;
}
let scanAbortController = null;
let activeHasher = null;
const undoStack = [];
const MAX_UNDO_STACK = 50;
function registerIPCHandlers(mainWindow2, thumbnailDir2) {
  electron.ipcMain.handle(IPC_CHANNELS.SELECT_FOLDERS, async () => {
    const result = await electron.dialog.showOpenDialog(mainWindow2, {
      title: "Select Folders to Scan for Duplicates",
      properties: ["openDirectory", "multiSelections"],
      buttonLabel: "Scan These Folders"
    });
    return result.canceled ? [] : result.filePaths;
  });
  electron.ipcMain.handle(
    IPC_CHANNELS.SCAN_START,
    async (_event, folders, threshold) => {
      if (scanAbortController) {
        throw new Error("A scan is already in progress. Cancel it first.");
      }
      scanAbortController = new AbortController();
      const { signal } = scanAbortController;
      const startTime = Date.now();
      const sendProgress = (progress) => {
        if (!mainWindow2.isDestroyed()) {
          mainWindow2.webContents.send(IPC_CHANNELS.SCAN_PROGRESS, progress);
        }
      };
      try {
        sendProgress({
          phase: "scanning",
          current: 0,
          total: 0,
          message: "Discovering image files..."
        });
        const scannedFiles = await scanDirectories(
          folders,
          (count, currentFile) => {
            sendProgress({
              phase: "scanning",
              current: count,
              total: 0,
              currentFile,
              message: `Found ${count} images...`
            });
          },
          signal
        );
        if (signal.aborted) {
          sendProgress({ phase: "cancelled", current: 0, total: 0, message: "Scan cancelled." });
          return null;
        }
        if (scannedFiles.length === 0) {
          sendProgress({
            phase: "complete",
            current: 0,
            total: 0,
            message: "No image files found in the selected folders."
          });
          const emptyResults = {
            groups: [],
            totalFilesScanned: 0,
            totalDuplicates: 0,
            totalSpaceSavings: 0,
            scanDurationMs: Date.now() - startTime
          };
          mainWindow2.webContents.send(IPC_CHANNELS.SCAN_RESULTS, emptyResults);
          return emptyResults;
        }
        sendProgress({
          phase: "hashing",
          current: 0,
          total: scannedFiles.length,
          message: `Analyzing ${scannedFiles.length} images...`
        });
        activeHasher = new HasherService();
        const hashedImages = await activeHasher.hashFiles(
          scannedFiles,
          thumbnailDir2,
          (completed, total, currentFile) => {
            sendProgress({
              phase: "hashing",
              current: completed,
              total,
              currentFile,
              message: `Analyzing image ${completed} of ${total}...`
            });
          },
          signal
        );
        await activeHasher.destroy();
        activeHasher = null;
        if (signal.aborted) {
          sendProgress({ phase: "cancelled", current: 0, total: 0, message: "Scan cancelled." });
          return null;
        }
        sendProgress({
          phase: "grouping",
          current: 0,
          total: hashedImages.length,
          message: "Grouping duplicates..."
        });
        const groups = groupDuplicates(hashedImages, threshold ?? 5);
        const totalDuplicates = groups.reduce(
          (sum, g) => sum + g.images.length - 1,
          // subtract 1 for the original
          0
        );
        const totalSpaceSavings = groups.reduce((sum, g) => sum + g.spaceSavings, 0);
        const failedFiles = hashedImages.filter((img) => img.error).map((img) => ({ filePath: img.filePath, error: img.error }));
        const results = {
          groups,
          totalFilesScanned: scannedFiles.length,
          totalDuplicates,
          totalSpaceSavings,
          scanDurationMs: Date.now() - startTime,
          failedFiles
        };
        sendProgress({
          phase: "complete",
          current: scannedFiles.length,
          total: scannedFiles.length,
          message: `Found ${groups.length} groups with ${totalDuplicates} duplicates.`
        });
        if (!mainWindow2.isDestroyed()) {
          mainWindow2.webContents.send(IPC_CHANNELS.SCAN_RESULTS, results);
        }
        return results;
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        sendProgress({
          phase: "error",
          current: 0,
          total: 0,
          message: `Scan error: ${message}`
        });
        throw err;
      } finally {
        scanAbortController = null;
        if (activeHasher) {
          await activeHasher.destroy();
          activeHasher = null;
        }
      }
    }
  );
  electron.ipcMain.handle(IPC_CHANNELS.SCAN_CANCEL, async () => {
    if (scanAbortController) {
      scanAbortController.abort();
      scanAbortController = null;
      if (activeHasher) {
        await activeHasher.destroy();
        activeHasher = null;
      }
      return true;
    }
    return false;
  });
  electron.ipcMain.handle(IPC_CHANNELS.ACTION_DELETE, async (_event, filePaths) => {
    const { default: trash } = await import("trash");
    const undoEntry = {
      id: crypto.randomUUID(),
      deletedAt: (/* @__PURE__ */ new Date()).toISOString(),
      files: filePaths.map((p) => ({
        originalPath: p,
        fileName: p.split(/[\\/]/).pop() ?? "",
        size: 0
        // Size tracking is best-effort
      }))
    };
    const errors = [];
    for (const filePath of filePaths) {
      try {
        await trash(filePath);
      } catch (err) {
        errors.push({
          path: filePath,
          error: err instanceof Error ? err.message : String(err)
        });
      }
    }
    const successCount = filePaths.length - errors.length;
    if (successCount > 0) {
      const failedPaths = new Set(errors.map((e) => e.path));
      undoEntry.files = undoEntry.files.filter((f) => !failedPaths.has(f.originalPath));
      undoStack.push(undoEntry);
      while (undoStack.length > MAX_UNDO_STACK) {
        undoStack.shift();
      }
    }
    return {
      deletedCount: successCount,
      errors,
      undoId: undoEntry.id
    };
  });
  electron.ipcMain.handle(IPC_CHANNELS.ACTION_UNDO, async (_event, undoId) => {
    let entry;
    if (undoId) {
      const index = undoStack.findIndex((e) => e.id === undoId);
      if (index !== -1) {
        entry = undoStack.splice(index, 1)[0];
      }
    } else {
      entry = undoStack.pop();
    }
    if (!entry) {
      return { success: false, message: "No undo operation available." };
    }
    return {
      success: true,
      message: `Found undo entry from ${entry.deletedAt} with ${entry.files.length} files. Files were moved to the system Recycle Bin. Please restore them manually from the Recycle Bin.`,
      files: entry.files
    };
  });
  electron.ipcMain.handle(
    IPC_CHANNELS.COMPARE_IMAGES,
    async (_event, pathA, pathB) => {
      return await compareImages(pathA, pathB);
    }
  );
  electron.ipcMain.handle(
    IPC_CHANNELS.EXPORT_CSV,
    async (_event, groups) => {
      return await exportToCSV(groups, mainWindow2);
    }
  );
  electron.ipcMain.handle(IPC_CHANNELS.THUMBNAIL_GET, async (_event, thumbnailPath) => {
    try {
      const buffer = await promises.readFile(thumbnailPath);
      return `data:image/webp;base64,${buffer.toString("base64")}`;
    } catch (err) {
      console.warn("[IPC] Failed to read thumbnail:", thumbnailPath, err.message);
      return null;
    }
  });
  electron.ipcMain.handle("system:open-file", async (_event, filePath) => {
    const { shell } = require("electron");
    await shell.openPath(filePath);
  });
  electron.ipcMain.handle("system:select-files", async () => {
    const result = await electron.dialog.showOpenDialog(mainWindow2, {
      title: "Select Images to Compare",
      properties: ["openFile"],
      filters: [
        { name: "Images", extensions: ["jpg", "jpeg", "png", "webp", "heic", "tiff", "tif", "bmp", "gif"] }
      ]
    });
    return result.canceled ? [] : result.filePaths;
  });
}
function unregisterIPCHandlers() {
  const channels = Object.values(IPC_CHANNELS);
  for (const channel of channels) {
    electron.ipcMain.removeHandler(channel);
  }
  electron.ipcMain.removeHandler("system:open-file");
  electron.ipcMain.removeHandler("system:select-files");
}
let mainWindow = null;
let thumbnailDir;
function createWindow() {
  mainWindow = new electron.BrowserWindow({
    title: "PhotoSweep",
    width: 1400,
    height: 900,
    minWidth: 1e3,
    minHeight: 700,
    backgroundColor: "#0f0f14",
    titleBarStyle: "hiddenInset",
    titleBarOverlay: {
      color: "#0f0f14",
      symbolColor: "#a0a0b0",
      height: 36
    },
    show: false,
    webPreferences: {
      preload: node_path.join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.on("ready-to-show", () => {
    try {
      mainWindow?.setTitle("PhotoSweep");
    } catch (err) {
      console.warn("[Main] Unable to set window title:", err);
    }
    mainWindow?.show();
  });
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:") || url.startsWith("http:")) {
      electron.shell.openExternal(url);
    }
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(node_path.join(__dirname, "../renderer/index.html"));
  }
  return mainWindow;
}
async function initThumbnailDir() {
  const dir = node_path.join(electron.app.getPath("userData"), "thumbnails");
  await promises.mkdir(dir, { recursive: true });
  return dir;
}
electron.app.whenReady().then(async () => {
  if (utils.is.dev) {
    try {
      const devData = node_path.join(electron.app.getPath("home"), ".duplicate-photo-cleaner-dev");
      electron.app.setPath("userData", devData);
      await promises.mkdir(electron.app.getPath("userData"), { recursive: true });
    } catch (err) {
      console.warn("[Main] Unable to set dev userData path:", err);
    }
  }
  try {
    ;
    electron.app.name = "PhotoSweep";
  } catch (err) {
    console.warn("[Main] Unable to set app name:", err);
  }
  initDB();
  thumbnailDir = await initThumbnailDir();
  cleanupThumbnails(thumbnailDir).catch((err) => {
    console.error("[DB] Thumbnail cleanup failed:", err);
  });
  const window = createWindow();
  registerIPCHandlers(window, thumbnailDir);
  electron.app.on("activate", () => {
    if (electron.BrowserWindow.getAllWindows().length === 0) {
      const newWindow = createWindow();
      registerIPCHandlers(newWindow, thumbnailDir);
    }
  });
});
electron.app.on("window-all-closed", () => {
  unregisterIPCHandlers();
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("before-quit", () => {
  unregisterIPCHandlers();
  closeDB();
});
