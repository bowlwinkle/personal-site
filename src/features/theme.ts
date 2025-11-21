import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type ThemeName = 'light' | 'dark' | 'github' | 'discord' | 'notion' | 'dracula' | 'monokai' | 'solarized' | 'nord'

export interface ThemeState {
  currentTheme: ThemeName
}

const initialState: ThemeState = {
  currentTheme: 'light',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeName>) => {
      state.currentTheme = action.payload
    },
    reset: (state) => {
      state.currentTheme = initialState.currentTheme
    },
  },
})

export const { setTheme, reset } = themeSlice.actions
export default themeSlice.reducer
