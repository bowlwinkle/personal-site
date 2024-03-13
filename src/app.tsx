import './app.scss'
import { Outlet } from 'react-router-dom'
import { routes } from './router'
import { SidebarNav } from './components/navigation/sidebar'
import { TopNav } from './components/navigation/top-nav'
import { Navigation, config } from './config'
import { ReactNode, ReactElement } from 'react'
import { DesktopContainer } from './components/navigation/desktop-container'
import { MediaContextProvider } from './components/media'
import { MobileContainer } from './components/navigation/mobile-container'

function TopNavLayout(): ReactElement {
  return (
    <div className="topNavLayout">
      <TopNav items={routes} />
      <div className="content">
        <Outlet />
      </div>
    </div>
  )
}

function SideNavLayout(): ReactElement {
  return (
    <SidebarNav items={routes}>
      <Outlet />
    </SidebarNav>
  )
}

type AppProps = {
  children?: ReactNode
}

let App: (props: AppProps) => ReactElement

switch (config.nav.activeNav) {
  case Navigation.Side:
    App = SideNavLayout
    break

  case Navigation.SemanticTop:
    App = () => (
      <MediaContextProvider>
        <DesktopContainer routes={routes}>
          <Outlet />
        </DesktopContainer>
        <MobileContainer routes={routes}>
          <Outlet />
        </MobileContainer>
      </MediaContextProvider>
    )
    break

  case Navigation.Top:
  default:
    App = TopNavLayout
    break
}

export default App
