import { useMemo } from 'react'
import { NavbarItem as NavbarItem } from './sidebar'
import { NavLink } from 'react-router-dom'
import { ContactInfo } from '../contact'
import { List, ListItem } from 'semantic-ui-react'
import { LogoSVG } from '../logo'

type TopNavProps = {
  items: NavbarItem[]
}

export function TopNav({ items }: TopNavProps) {
  const activeCSSHandler = ({
    isActive,
    isPending,
  }: {
    isActive: boolean
    isPending: boolean
  }): string => (isPending ? 'pending' : isActive ? 'active' : '')

  const navItems = useMemo(
    () =>
      items.map((item: NavbarItem) => (
        <ListItem className="navItem">
          <NavLink className={activeCSSHandler} to={item.to}>
            {item.label}
          </NavLink>
        </ListItem>
      )),
    items
  )

  return (
    <nav className="topNav">
      <LogoSVG width="75" height="75" />
      <List divided horizontal>
        {navItems}
        <ListItem className="navItem">
          <ContactInfo />
        </ListItem>
      </List>
    </nav>
  )
}
