import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeName =
  | 'light'
  | 'dark'
  | 'github'
  | 'discord'
  | 'notion'
  | 'dracula'
  | 'monokai'
  | 'solarized'
  | 'nord'

export interface ThemeState {
  currentTheme: ThemeName
}

const getInitialTheme = (): ThemeName => {
  const savedTheme = localStorage.getItem('theme')
  return (savedTheme as ThemeName) || 'light'
}

const initialState: ThemeState = {
  currentTheme: getInitialTheme(),
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      state.currentTheme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    reset: (state) => {
      state.currentTheme = 'light'
      localStorage.removeItem('theme')
    },
  },
})

export const { setTheme, reset } = themeSlice.actions
export default themeSlice.reducer
