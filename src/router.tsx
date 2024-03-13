import { createBrowserRouter } from 'react-router-dom'

import Skills from './pages/skills/skills'
import { About } from './pages/about/about'
import App from './app'
import Home from './pages/home/home'
import { NavbarItem } from './components/navigation/sidebar'
import { config } from './config'

const routeDefinitions = [
  {
    to: '/',
    label: 'Home',
    icon: 'home',
  },
  {
    to: '/skills',
    label: 'Skills',
    icon: 'sliders',
  },
  {
    to: '/work',
    label: 'Work',
    icon: 'wrench',
    enabled: false,
  },
  {
    to: '/about',
    label: 'About',
    icon: 'info',
  },
] as NavbarItem[]

export const routes = routeDefinitions.filter(
  (route) => route.enabled !== false || config.nav.showAllRoutes
)

export const router = createBrowserRouter([
  {
    path: '*',
    element: <span>404 - Not Found</span>,
  },
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/skills',
        element: <Skills />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])
