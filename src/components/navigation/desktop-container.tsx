import { ReactElement, ReactNode, useMemo, Key } from 'react'
import { Media } from '../media'
import { useInView } from 'react-intersection-observer'
import { Menu, Container, Segment } from 'semantic-ui-react'
import { LogoPNG } from '../logo'
import { NavbarItem } from './sidebar'
import { NavLink } from 'react-router-dom'

type DesktopContainerProps = {
  routes: NavbarItem[]
  children?: ReactNode
}

export function DesktopContainer({
  routes,
  children,
}: DesktopContainerProps): ReactElement {
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
    <Media greaterThan="mobile">
      <div ref={ref}>
        <Segment vertical className="desktopContainer">
          <Menu
            fixed={inView ? undefined : 'top'} // This enables the menu to stick
            inverted={!inView}
            pointing={inView}
            secondary={inView}
            size="large"
          >
            <Container>
              <Menu.Item position="left" className="logoPNG">
                <LogoPNG size="tiny" />
              </Menu.Item>
              {menuItems}
            </Container>
          </Menu>
        </Segment>
      </div>
      {children}
    </Media>
  )
}
