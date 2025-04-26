import { WindowState } from '@/types'
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron'

const api = {
  devTools: {
    toggleDevTools() {
      ipcRenderer.emit('toggle-dev-tools')
    }
  },
  window: {
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
