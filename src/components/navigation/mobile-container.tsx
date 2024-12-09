import { Sidebar, Menu, Segment, Container, Icon } from 'semantic-ui-react'
import { Media } from '../media'
import { Key, ReactNode, useMemo, useState } from 'react'
import { NavbarItem } from './sidebar'
import { NavLink } from 'react-router-dom'
import { LGSVG } from '../logo'

type MobileContainerProps = {
  routes: NavbarItem[]
  children?: ReactNode
}

export function MobileContainer({ children, routes }: MobileContainerProps) {
  const [sideBarOpen, toggleSidebar] = useState(false)
  const path = location.pathname.replace('/', '')

  const menuItems = useMemo(
    () =>
      routes.map((route: NavbarItem) => (
        <Menu.Item
          as={NavLink}
          to={route.to}
          key={route.to as Key}
          onClick={() => toggleSidebar(false)}
        >
          {route.label}
        </Menu.Item>
      )),
    routes
  )

  return (
    <Media at="mobile" style={{ position: 'relative' }}>
      <Sidebar.Pushable style={{ height: '100vh' }}>
        <Sidebar
          id="nav"
          as={Menu}
          animation="overlay"
          inverted
          onHide={() => toggleSidebar(false)}
          vertical
          visible={sideBarOpen}
        >
          {menuItems}
        </Sidebar>

        <Sidebar.Pusher dimmed={sideBarOpen}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: '1em 0em' }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={() => toggleSidebar(true)}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item position="right" className="logoPNG mobile">
                  <NavLink to="/">
                    <LGSVG className={path} />
                  </NavLink>
                </Menu.Item>
              </Menu>
            </Container>
          </Segment>
          <Container className="mobileContainer fadeIn">{children}</Container>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}
