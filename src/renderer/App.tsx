import { useWindowEvent } from '@mantine/hooks'
import { useEffect } from 'react'
import './App.scss'
import { api } from './preload'
import { useWindowStateStore } from './stores'

export function App() {
  const { maximized, setWindowState } = useWindowStateStore()

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
        <div className="window-controls">
          <button className="window-button window-minimize" onClick={api.window.minimize}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" stroke="currentColor" strokeWidth={0} fill="currentColor">
              <path d="M14 8v1H3V8h11z" />
            </svg>
          </button>
          <button className="window-button window-maximize" onClick={api.window.maximize}>
            {maximized ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" stroke="currentColor" strokeWidth={0} fill="currentColor">
                <path d="M3 5v9h9V5H3zm8 8H4V6h7v7z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M5 5h1V4h7v7h-1v1h2V3H5v2z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" stroke="currentColor" strokeWidth={0} fill="currentColor">
                <path d="M3 3v10h10V3H3zm9 9H4V4h8v8z" />
              </svg>
            )}
          </button>
          <button className="window-button window-close" onClick={api.window.close}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="1em" height="1em" stroke="currentColor" strokeWidth={0} fill="currentColor">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.116 8l-4.558 4.558.884.884L8 8.884l4.558 4.558.884-.884L8.884 8l4.558-4.558-.884-.884L8 7.116 3.442 2.558l-.884.884L7.116 8z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className="window-body"></div>
    </div>
  )
}

export default App
