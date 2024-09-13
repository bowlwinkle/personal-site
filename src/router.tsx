import { createBrowserRouter } from 'react-router-dom'

import Skills from './pages/skills/skills'
import { About } from './pages/about/about'
import App from './app'
import { Home } from './pages/home/home'
import { Playground } from './pages/playground/playground'
import { NavbarItem } from './components/navigation/sidebar'
import { config } from './config'
import { WorkHistory } from './pages/work/work'
import { NotFound } from './components/404'

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
    enabled: true,
  },
  {
    to: '/about',
    label: 'About',
    icon: 'info',
  },
  {
    to: '/playground',
    label: 'Playground',
    icon: 'fly',
    enabled: false,
  },
] as NavbarItem[]

export const routes = routeDefinitions.filter(
  (route) => route.enabled !== false || config.nav.showAllRoutes
)

const childrenRoutes = (prefix = '') => [
  {
    path: `${prefix}/`,
    element: <Home />,
  },
  {
    path: `${prefix}/skills`,
    element: <Skills />,
  },
  {
    path: `${prefix}/work`,
    element: <WorkHistory />,
  },
  {
    path: `${prefix}/about`,
    element: <About />,
  },
  {
    path: `${prefix}/playground`,
    element: <Playground />,
  },
]

export const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <App>
        <NotFound />
      </App>
    ),
  },
  {
    path: '/',
    element: <App />,
    children: [...childrenRoutes()],
  },
])
