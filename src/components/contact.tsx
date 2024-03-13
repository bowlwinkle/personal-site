import { List, ListIcon, ListItem } from 'semantic-ui-react'

export function ContactInfo() {
  return (
    <List horizontal>
      <ListItem className="contactListItem">
        <a href="https://www.linkedin.com/in/lucas-gansberg/">
          <ListIcon name="linkedin" />
        </a>
      </ListItem>
    </List>
  )
}
