import { ReactElement, ReactNode, useMemo, Key } from 'react'
import { Media } from '../media'
import { useInView } from 'react-intersection-observer'
import { Menu, Container, Segment } from 'semantic-ui-react'
import { NavbarItem } from './sidebar'
import { NavLink, useLocation } from 'react-router-dom'
import { LGSVG } from '../logo'
import { ThemeSelector } from '../theme-selector'

type DesktopContainerProps = {
  routes: NavbarItem[]
  children?: ReactNode
}

export function DesktopContainer({
  routes,
  children,
}: DesktopContainerProps): ReactElement {
  const location = useLocation()
  const path = location.pathname.replace('/', '')

  // Leveraging the inView hook to show new navbar when scrolling past
  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  })

  const menuItems = useMemo(
    () =>
      routes.map((route: NavbarItem) => (
        <Menu.Item as={NavLink} to={route.to} key={route.to as Key}>
          {route.label}
        </Menu.Item>
      )),
    routes
  )

  return (
    <Media greaterThan="mobile" style={{ position: 'relative' }}>
      <div ref={ref}>
        <Segment id="nav" vertical className="desktopContainer">
          <Menu
            fixed={inView ? undefined : 'top'} // This enables the menu to stick
            inverted={!inView}
            pointing={inView}
            secondary={inView}
            size="large"
          >
            <Container>
              <Menu.Item position="left" className="logoPNG">
                <NavLink to="/">
                  <LGSVG className={path} />
                </NavLink>
              </Menu.Item>
              {menuItems}
              <Menu.Item position="right">
                <ThemeSelector />
              </Menu.Item>
            </Container>
          </Menu>
        </Segment>
      </div>
      <Container className="fadeIn">
        <div className="pageContent">{children}</div>
      </Container>
    </Media>
  )
}
