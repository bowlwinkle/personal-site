import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface AppState {
  darkMode: boolean
}

const initialState: AppState = {
  darkMode: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggle: (state) => {
      state.darkMode = !state.darkMode
    },
    reset: (state) => {
      state.darkMode = initialState.darkMode
    },
    setTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { toggle, reset } = themeSlice.actions

export default themeSlice.reducer
