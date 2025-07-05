import type { WindowState } from '@/types'
import type { IpcRendererEvent } from 'electron'
import { contextBridge, ipcRenderer } from 'electron'

const api = {
  devTools: {
    toggleDevTools() {
      ipcRenderer.send('toggle-dev-tools')
    }
  },
  window: {
    minimize() {
      ipcRenderer.send('window-minimize')
    },
    maximize() {
      ipcRenderer.send('window-maximize')
    },
    close() {
      ipcRenderer.send('window-close')
    },
    getWindowState() {
      return ipcRenderer.invoke('get-window-state')
    },
    onWindowStateChange(callback: (event: IpcRendererEvent, state: Partial<WindowState>) => void): () => void {
      ipcRenderer.on('window-state-change', callback)
      return () => ipcRenderer.off('window-state-change', callback)
    }
  }
} as const

export type Api = typeof api

contextBridge.exposeInMainWorld('api', api)
