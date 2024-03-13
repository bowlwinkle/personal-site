import { ReactNode, useMemo } from 'react'
import {
  Sidebar,
  SidebarPushable,
  Menu,
  MenuItem,
  SemanticICONS,
  SidebarPusher,
} from 'semantic-ui-react'
import { NavLink, To } from 'react-router-dom'

export type NavbarItem = {
  to: To
  label: string
  icon?: SemanticICONS
  enabled?: boolean
}

type SidebarProps = {
  items: NavbarItem[]
  children?: ReactNode
}

export function SidebarNav({ items, children }: SidebarProps) {
  const NavbarItems = useMemo(
    () =>
      items.map((item: NavbarItem) => (
        <MenuItem as={NavLink} to={item.to}>
          {/* <Icon name={item.icon} /> */}
          {item.label}
        </MenuItem>
      )),
    items
  )

  return (
    <SidebarPushable>
      <Sidebar as={Menu} icon="labeled" inverted vertical visible width="thin">
        {NavbarItems}
      </Sidebar>
      <SidebarPusher>{children}</SidebarPusher>
    </SidebarPushable>
  )
}
