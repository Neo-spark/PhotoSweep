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
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const node_crypto = require("node:crypto");
const node_fs = require("node:fs");
const promises = require("node:fs/promises");
const node_path = require("node:path");
const sharp = require("sharp");
async function hashFile(input) {
  const { filePath, thumbnailDir } = input;
  const fileName = node_path.basename(filePath);
  try {
    const fileStat = await promises.stat(filePath);
    const createdAt = (fileStat.birthtime ?? fileStat.mtime).toISOString();
    const fileSize = fileStat.size;
    const { rawBuffer, sha256 } = await new Promise((resolve, reject) => {
      const stream = node_fs.createReadStream(filePath);
      const hash = node_crypto.createHash("sha256");
      const chunks = [];
      stream.on("data", (chunk) => {
        hash.update(chunk);
        chunks.push(chunk);
      });
      stream.on("end", () => {
        resolve({
          rawBuffer: Buffer.concat(chunks),
          sha256: hash.digest("hex")
        });
      });
      stream.on("error", reject);
    });
    let imageBuffer = rawBuffer;
    const ext = node_path.extname(filePath).toLowerCase();
    if (!imageBuffer || imageBuffer.length === 0) {
      const errorMessage = "Input buffer is empty";
      console.warn(`[HashWorker] Skipping empty file ${filePath}`);
      return {
        filePath,
        fileName,
        sha256: "",
        phash: "",
        width: 0,
        height: 0,
        format: "unknown",
        size: 0,
        thumbnailPath: "",
        createdAt: "",
        error: errorMessage,
        blurScore: 0
      };
    }
    if (ext === ".heic") {
      imageBuffer = await convertHeic(rawBuffer);
    }
    const sharpInstance = sharp(imageBuffer, { failOn: "none" });
    const metadata = await sharpInstance.metadata();
    const width = metadata.width ?? 0;
    const height = metadata.height ?? 0;
    const format = metadata.format ?? "unknown";
    const perceptualHash = await computeDhash(imageBuffer);
    const thumbnailPath = await generateThumbnail(imageBuffer, sha256, thumbnailDir);
    return {
      filePath,
      fileName,
      sha256,
      phash: perceptualHash,
      width,
      height,
      format: String(format),
      size: fileSize,
      thumbnailPath,
      createdAt,
      blurScore: 0
      // Simplification for now, as Laplacian variance in TS adds overhead
    };
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[HashWorker] Error processing ${filePath}: ${errorMessage}`);
    return {
      filePath,
      fileName,
      sha256: "",
      phash: "",
      width: 0,
      height: 0,
      format: "unknown",
      size: 0,
      thumbnailPath: "",
      createdAt: "",
      error: errorMessage,
      blurScore: 0
    };
  }
}
async function convertHeic(buffer) {
  const heicConvert = (await import("heic-convert")).default;
  const result = await heicConvert({
    buffer,
    format: "JPEG",
    quality: 0.92
  });
  return Buffer.from(result);
}
async function generateThumbnail(imageBuffer, sha256, thumbnailDir) {
  await promises.mkdir(thumbnailDir, { recursive: true });
  const thumbFileName = `${sha256}.webp`;
  const thumbPath = node_path.join(thumbnailDir, thumbFileName);
  await sharp(imageBuffer, { failOn: "none" }).resize(200, void 0, { fit: "inside", withoutEnlargement: true }).webp({ quality: 80 }).toFile(thumbPath);
  return thumbPath;
}
async function computeDhash(imageBuffer) {
  const { data } = await sharp(imageBuffer, { failOn: "none" }).greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer({ resolveWithObject: true });
  let hash = "";
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const left = data[y * 9 + x];
      const right = data[y * 9 + x + 1];
      hash += left > right ? "1" : "0";
    }
  }
  let hexHash = "";
  for (let i = 0; i < hash.length; i += 4) {
    hexHash += parseInt(hash.substring(i, i + 4), 2).toString(16);
  }
  return hexHash;
}
exports.computeDhash = computeDhash;
exports.default = hashFile;
