import { NavLink } from 'react-router-dom'
import { Icon, List, ListIcon, ListItem } from 'semantic-ui-react'

export function ContactInfo() {
  return (
    <List horizontal>
      <ListItem className="contactLink">
        <a href="https://www.linkedin.com/in/lucas-gansberg/">
          <ListIcon name="linkedin" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="mailto:lucas.gansberg@gmail.com">
          <Icon name="mail" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <NavLink to="/work?tab=Resume">
          <Icon name="file alternate" />
        </NavLink>
      </ListItem>
    </List>
  )
}
