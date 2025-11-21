import { NavLink } from 'react-router-dom'
import { Icon, List, ListIcon, ListItem, Popup } from 'semantic-ui-react'

export function ContactInfo() {
  return (
    <List horizontal>
      <ListItem className="contactLink">
        <a href="mailto:lucas.gansberg@gmail.com">
          <Icon name="mail" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="https://www.linkedin.com/in/lucas-gansberg/">
          <Popup
            trigger={<ListIcon name="linkedin" />}
            content="LinkedIn"
            position="bottom center"
          />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="https://github.com/bowlwinkle">
          <ListIcon name="github" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <NavLink to="/work?tab=Resume">
          <Popup
            trigger={<Icon name="file alternate" />}
            content="Resume"
            position="bottom center"
          />
        </NavLink>
      </ListItem>
    </List>
  )
}
