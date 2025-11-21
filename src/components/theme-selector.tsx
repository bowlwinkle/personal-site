import { Dropdown } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { setTheme, ThemeName } from '../features/theme'

const themeOptions = [
  { key: 'light', text: 'Light', value: 'light' as ThemeName },
  { key: 'dark', text: 'Dark', value: 'dark' as ThemeName },
  { key: 'github', text: 'GitHub', value: 'github' as ThemeName },
  { key: 'discord', text: 'Discord', value: 'discord' as ThemeName },
  { key: 'notion', text: 'Notion', value: 'notion' as ThemeName },
  { key: 'dracula', text: 'Dracula', value: 'dracula' as ThemeName },
  { key: 'monokai', text: 'Monokai', value: 'monokai' as ThemeName },
  { key: 'solarized', text: 'Solarized', value: 'solarized' as ThemeName },
  { key: 'nord', text: 'Nord', value: 'nord' as ThemeName },
]

export function ThemeSelector() {
  const currentTheme = useSelector(
    (state: RootState) => state.theme.currentTheme
  )
  const dispatch = useDispatch()

  return (
    <Dropdown
      selection
      compact
      icon={null}
      options={themeOptions}
      value={currentTheme}
      onChange={(_, { value }) => dispatch(setTheme(value as ThemeName))}
    />
  )
}
