import { useAppStore } from './store/useAppStore'
import { Layout } from './components/Layout'
import { FolderSelector } from './components/FolderSelector'
import { ScanProgress } from './components/ScanProgress'
import { DuplicateGroups } from './components/DuplicateGroups'
import { CompareView } from './components/CompareView'
import { SettingsPanel } from './components/SettingsPanel'
import { ActionBar } from './components/ActionBar'
import { UndoToast } from './components/UndoToast'
import { useScanner } from './hooks/useScanner'

function App(): JSX.Element {
  // Initialize scanner event listeners
  useScanner()

  const view = useAppStore((s) => s.view)
  const scanState = useAppStore((s) => s.scanState)

  const renderView = () => {
    // If scanning, always show progress
    if (scanState === 'scanning') {
      return <ScanProgress />
    }

    switch (view) {
      case 'scan':
        return <FolderSelector />
      case 'results':
        return <DuplicateGroups />
      case 'compare':
        return <CompareView />
      case 'settings':
        return <SettingsPanel />
      default:
        return <FolderSelector />
    }
  }

  const showActionBar = view === 'results' && scanState === 'complete'

  return (
    <Layout>
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-hidden">{renderView()}</div>
        {showActionBar && <ActionBar />}
      </div>
      <UndoToast />
    </Layout>
  )
}

export default App
