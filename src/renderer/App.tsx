import { useWindowEvent } from '@mantine/hooks'
import { useEffect } from 'react'
import './App.scss'
import { api } from './preload'
import { useWindowStateStore } from './stores'

export function App() {
  const { setWindowState } = useWindowStateStore()

  useWindowEvent('keydown', (event: KeyboardEvent) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLocaleUpperCase() === 'I') {
      api.devTools.toggleDevTools()
    }
  })

  useEffect(() => {
    api.window.getWindowState().then(setWindowState)
  }, [setWindowState])

  useEffect(() => {
    return api.window.onWindowStateChange((_, state) => {
      setWindowState(state)
    })
  }, [setWindowState])

  return (
    <div className="window">
      <div className="window-title-bar">
        <div className="window-title"></div>
        <div className="window-menus"></div>
        <div className="window-controls"></div>
      </div>
      <div className="window-body"></div>
    </div>
  )
}

export default App
