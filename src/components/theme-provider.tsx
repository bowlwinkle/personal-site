import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface ThemeProviderProps {
  children: ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const currentTheme = useSelector((state: RootState) => state.theme.currentTheme)

  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      // Remove all theme classes
      root.className = root.className.replace(/\b(light|dark|github|discord|notion)Mode\b/g, '').trim()
      // Add current theme class
      root.classList.add(`${currentTheme}Mode`)
    }
  }, [currentTheme])

  return <>{children}</>
}