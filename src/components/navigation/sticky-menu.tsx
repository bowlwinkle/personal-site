import { useMemo } from 'react'
import { Sticky } from 'semantic-ui-react'
import { NavLink, To } from 'react-router-dom'

type MenuItem = {
  to: To
  label: string
}

type MenuProps = {
  items: MenuItem[]
}

export function Menu({ items }: MenuProps) {
  const activeCSSHandler = ({
    isActive,
    isPending,
  }: {
    isActive: boolean
    isPending: boolean
  }): string => (isPending ? 'pending' : isActive ? 'active' : '')

  const menuItems = useMemo(
    () =>
      items.map((item: MenuItem) => (
        <NavLink className={activeCSSHandler} to={item.to}>
          {item.label}
        </NavLink>
      )),
    items
  )

  // /*eslint no-debugger: "warn"*/
  // debugger

  return (
    <nav className="nav">
      <Sticky bottomOffset={50} pushing>
        {menuItems}
      </Sticky>
    </nav>
  )
}
