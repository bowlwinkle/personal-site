import { Icon, List, ListIcon, ListItem } from 'semantic-ui-react'

export function ContactInfo() {
  return (
    <List horizontal>
      <ListItem className="contactLink">
        <a href="mailto:lucas.gansberg@gmail.com">
          <Icon name="mail" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="www.lucas-gansberg.com">
          <Icon name="user circle" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="https://www.linkedin.com/in/lucas-gansberg/">
          <ListIcon name="linkedin" />
        </a>
      </ListItem>
      <ListItem className="contactLink">
        <a href="https://github.com/bowlwinkle">
          <ListIcon name="github" />
        </a>
      </ListItem>
    </List>
  )
}
