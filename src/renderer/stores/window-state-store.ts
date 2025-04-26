import { WindowState } from '@/types'
import { create } from 'zustand'

export interface WindowStateStore extends WindowState {
  setWindowState(state: Partial<WindowState>): void
}

export const useWindowStateStore = create<WindowStateStore>((set) => {
  return {
    minimized: false,
    maximized: false,
    setWindowState(state: Partial<WindowState>) {
      set(state)
    }
  }
})
