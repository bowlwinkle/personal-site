import { Container, Header, Image } from 'semantic-ui-react'
import NotFoundPNG from '../assets/not-found.png'
import { NavLink } from 'react-router-dom'

export function NotFound() {
  return (
    <Container text textAlign="center" className="notFound">
      <div>
        <Image src={NotFoundPNG} size="massive" lazy />
        <Header as="h3">
          <NavLink to="/">TAKE ME HOME</NavLink>
        </Header>
      </div>
    </Container>
  )
}
