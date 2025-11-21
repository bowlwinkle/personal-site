import { useSelector } from 'react-redux'
import SemanticComponents from 'semantic-ui-react'
import { RootState } from '../store/store'

// THIS CURRENTLY DOES NOT WORK - PROBABLY SHOULD JUST REMOVE

/* DO NOT LOVE THIS - Semantic Theming is build into the build system and I also don't
 *  like the idea of dynamic exports
 */

// @ts-expect-error - This is a higher order component for theming
function createThemedComponent(Component) {
  // @ts-expect-error - This is a higher order component for theming
  return (props) => {
    const currentTheme = useSelector((state: RootState) => state.theme.currentTheme)
    const isDark = currentTheme !== 'light'
    return <Component {...props} inverted={isDark} />
  }
}

export const Header = createThemedComponent(SemanticComponents.Header)
export const Label = createThemedComponent(SemanticComponents.Label)
export const Button = createThemedComponent(SemanticComponents.Button)
export const Segment = createThemedComponent(SemanticComponents.Segment)
export const Menu = createThemedComponent(SemanticComponents.Menu)
export const Divider = createThemedComponent(SemanticComponents.Divider)
export const Icon = createThemedComponent(SemanticComponents.Icon)
export const Input = createThemedComponent(SemanticComponents.Input)
export const List = createThemedComponent(SemanticComponents.List)
export const Placeholder = createThemedComponent(SemanticComponents.Placeholder)
export const Loader = createThemedComponent(SemanticComponents.Loader)
export const Form = createThemedComponent(SemanticComponents.Form)
export const Grid = createThemedComponent(SemanticComponents.Grid)
export const Table = createThemedComponent(SemanticComponents.Table)
export const Accordion = createThemedComponent(SemanticComponents.Accordion)
export const Popup = createThemedComponent(SemanticComponents.Popup)
export const Progress = createThemedComponent(SemanticComponents.Progress)
