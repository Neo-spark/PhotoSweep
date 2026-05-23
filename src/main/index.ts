/**
 * @fileoverview Electron main process entry point for Duplicate Photo Cleaner AI.
 *
 * Responsibilities:
 * - Creates the main BrowserWindow with appropriate settings
 * - Initializes the thumbnail cache directory
 * - Registers all IPC handlers
 * - Manages application lifecycle events
 * - Loads the renderer (dev server or production HTML file)
 */

import { app, BrowserWindow, shell } from 'electron'
import { join } from 'node:path'
import { mkdir } from 'node:fs/promises'
import { is } from '@electron-toolkit/utils'
import { registerIPCHandlers, unregisterIPCHandlers } from './ipc-handlers'
import { initDB, closeDB, cleanupThumbnails } from './services/db'

/** The main application window */
let mainWindow: BrowserWindow | null = null

/** Absolute path to the thumbnail cache directory */
let thumbnailDir: string

/**
 * Creates the main application window with the correct settings.
 *
 * @returns The created BrowserWindow instance
 */
function createWindow(): BrowserWindow {
  mainWindow = new BrowserWindow({
    title: 'PhotoSweep',
    width: 1400,
    height: 900,
    minWidth: 1000,
    minHeight: 700,
    backgroundColor: '#0f0f14',
    titleBarStyle: 'hiddenInset',
    titleBarOverlay: {
      color: '#0f0f14',
      symbolColor: '#a0a0b0',
      height: 36
    },
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true,
      nodeIntegration: false
    }
  })

  // Show window once content has loaded (avoids white flash)
  mainWindow.on('ready-to-show', () => {
    // Ensure the window title matches the runtime app name
    try {
      mainWindow?.setTitle('PhotoSweep')
    } catch (err) {
      console.warn('[Main] Unable to set window title:', err)
    }
    mainWindow?.show()
  })

  // Open external links in the default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:') || url.startsWith('http:')) {
      shell.openExternal(url)
    }
    return { action: 'deny' }
  })

  // Load the renderer
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  return mainWindow
}

/**
 * Initializes the thumbnail cache directory inside the app's user data folder.
 *
 * @returns Absolute path to the thumbnail directory
 */
async function initThumbnailDir(): Promise<string> {
  const dir = join(app.getPath('userData'), 'thumbnails')
  await mkdir(dir, { recursive: true })
  return dir
}

// ---------- App Lifecycle ----------

/**
 * Called when Electron has finished initialization.
 * Creates the window, sets up the thumbnail directory, and registers IPC handlers.
 */
app.whenReady().then(async () => {
  // In development, set a writable `userData` path to avoid Chromium cache permission errors
  if (is.dev) {
    try {
      const devData = join(app.getPath('home'), '.duplicate-photo-cleaner-dev')
      app.setPath('userData', devData)
      // ensure the directory exists so SQLite can create the DB inside it
      await mkdir(app.getPath('userData'), { recursive: true })
    } catch (err) {
      console.warn('[Main] Unable to set dev userData path:', err)
    }
  }
  // Set runtime app name for platform tooling and menus
  try {
    ; (app as any).name = 'PhotoSweep'
  } catch (err) {
    console.warn('[Main] Unable to set app name:', err)
  }

  // Initialize SQLite cache DB
  initDB()

  // Initialize thumbnail cache directory
  thumbnailDir = await initThumbnailDir()

  // Run cleanup in background (delete thumbnails unaccessed for > 30 days)
  cleanupThumbnails(thumbnailDir).catch((err) => {
    console.error('[DB] Thumbnail cleanup failed:', err)
  })

  // Create the main window
  const window = createWindow()

  // Register all IPC handlers
  registerIPCHandlers(window, thumbnailDir)

  // macOS: re-create window when dock icon is clicked and no windows exist
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      const newWindow = createWindow()
      registerIPCHandlers(newWindow, thumbnailDir)
    }
  })
})

/**
 * Quit the app when all windows are closed (except on macOS).
 */
app.on('window-all-closed', () => {
  unregisterIPCHandlers()

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/**
 * Cleanup before the app fully quits.
 */
app.on('before-quit', () => {
  unregisterIPCHandlers()
  closeDB()
})
