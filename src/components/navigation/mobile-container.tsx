import { Sidebar, Menu, Segment, Container, Icon } from 'semantic-ui-react'
import { Media } from '../media'
import { ReactNode, useMemo, useState } from 'react'
import { NavbarItem } from './sidebar'
import { NavLink } from 'react-router-dom'

type MobileContainerProps = {
  routes: NavbarItem[]
  children?: ReactNode
}

export function MobileContainer({ children, routes }: MobileContainerProps) {
  const [sideBarOpen, toggleSidebar] = useState(false)

  const menuItems = useMemo(
    () =>
      routes.map((route: NavbarItem) => (
        <Menu.Item as={NavLink} to={route.to}>
          {route.label}
        </Menu.Item>
      )),
    routes
  )

  return (
    <Media at="mobile">
      <Sidebar.Pushable>
        <Sidebar
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
              </Menu>
            </Container>
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}
