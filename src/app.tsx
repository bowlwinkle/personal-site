import './app.scss'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { routes } from './router'
import { SidebarNav } from './components/navigation/sidebar'
import { TopNav } from './components/navigation/top-nav'
import { Navigation, config } from './config'
import { ReactNode, ReactElement, useEffect, useMemo } from 'react'
import { DesktopContainer } from './components/navigation/desktop-container'
import { MediaContextProvider } from './components/media'
import { MobileContainer } from './components/navigation/mobile-container'
import { GoogleAuthProvider, useGoogleAuth } from './features/google_auth_context'

type AppProps = {
  children?: ReactNode
}

function AppLayout({ children }: AppProps): ReactElement {
  const { authState } = useGoogleAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Handle Github Pages routing redirect workaround by routing to the actual dashboard path
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const pathParam = searchParams.get('p')
    const isRedirectedToHomeWithDashboardParam =
      location.pathname === '/' &&
      (pathParam === '/dashboard' || location.search.includes('/dashboard'))

    if (isRedirectedToHomeWithDashboardParam) {
      navigate('/dashboard', { replace: true })
    }
  }, [location, navigate])

  // Dynamically include Dashboard menu option if owner is authenticated
  const navRoutes = useMemo(() => {
    if (authState.isAuthenticated) {
      const dashboardItem = { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' as const }
      // Avoid duplicate entries if any
      if (!routes.some((r) => r.to === '/dashboard')) {
        return [...routes, dashboardItem]
      }
    }
    return routes
  }, [authState.isAuthenticated])

  switch (config.nav.activeNav) {
    case Navigation.Side:
      return (
        <SidebarNav items={navRoutes}>
          <Outlet />
        </SidebarNav>
      )

    case Navigation.SemanticTop:
      return (
        <MediaContextProvider>
          <DesktopContainer routes={navRoutes}>
            <Outlet />
            {children}
          </DesktopContainer>
          <MobileContainer routes={navRoutes}>
            <Outlet />
            {children}
          </MobileContainer>
        </MediaContextProvider>
      )

    case Navigation.Top:
    default:
      return (
        <div className="topNavLayout">
          <TopNav items={navRoutes} />
          <div className="content">
            <Outlet />
          </div>
        </div>
      )
  }
}

export default function App({ children }: AppProps): ReactElement {
  return (
    <GoogleAuthProvider>
      <AppLayout>{children}</AppLayout>
    </GoogleAuthProvider>
  )
}

