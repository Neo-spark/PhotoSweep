import { useEffect } from 'react'
import { useAppStore } from '../store/useAppStore'

export function useScanner() {
  const setScanState = useAppStore((s) => s.setScanState)
  const setProgress = useAppStore((s) => s.setProgress)
  const setResults = useAppStore((s) => s.setResults)
  const setView = useAppStore((s) => s.setView)

  useEffect(() => {
    // Listen for progress updates
    let cleanupProgress: (() => void) | undefined
    let cleanupResults: (() => void) | undefined

    try {
      if (window && window.api && typeof window.api.onScanProgress === 'function') {
        cleanupProgress = window.api.onScanProgress((progress) => {
          setProgress(progress)

          // Auto-transition to idle on cancel/error
          if (progress.phase === 'cancelled') {
            setScanState('cancelled')
          } else if (progress.phase === 'error') {
            setScanState('idle')
          }
        })
      }

      if (window && window.api && typeof window.api.onScanResults === 'function') {
        cleanupResults = window.api.onScanResults((results) => {
          setResults(results)
          setScanState('complete')
          setView('results')
        })
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('useScanner failed to register IPC listeners', err)
    }

    return () => {
      try {
        if (cleanupProgress) cleanupProgress()
        if (cleanupResults) cleanupResults()
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('useScanner cleanup failed', err)
      }
    }
  }, [setProgress, setResults, setScanState, setView])

  const startScan = async (folders: string[], threshold: number) => {
    if (folders.length === 0) return

    setScanState('scanning')
    setProgress({ phase: 'scanning', current: 0, total: 0, currentFile: '', message: 'Starting...' })

    try {
      // startScan returns ScanResults | null, but we also get results via the event listener
      // The event listener handles setResults/setScanState, so we don't need to duplicate here
      await window.api.startScan(folders, threshold)
    } catch (error) {
      console.error('Scan failed:', error)
      setScanState('idle')
    }
  }

  const cancelScan = async () => {
    try {
      await window.api.cancelScan()
      setScanState('cancelled')
    } catch (err) {
      console.error('Failed to cancel scan:', err)
    }
  }

  return { startScan, cancelScan }
}
