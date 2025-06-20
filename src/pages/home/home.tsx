import './home.scss'
import { ReactNode } from 'react'
import { Container, Grid, Header } from 'semantic-ui-react'
import { ContactInfo } from '../../components/contact'
import { Map } from '../../components/animations/map'
import { Media } from '../../components/media'

function HomeGrid({ children, ...props }: { children: ReactNode }) {
  return (
    <>
      <Media at="mobile">
        <Grid columns={1} relaxed centered {...props}>
          {children}
        </Grid>
      </Media>
      <Media greaterThan="mobile">
        <Grid columns={2} relaxed centered {...props}>
          {children}
        </Grid>
      </Media>
    </>
  )
}

export function Home() {
  return (
    <Container className="home">
      <HomeGrid>
        <Grid.Row centered>
          <Grid.Column>
            <Grid className="homeDetails">
              <Grid.Row>
                <Header as="h1">Lucas Gansberg</Header>
              </Grid.Row>
              <Grid.Row>
                <div>
                  <Header as="h3">FULL STACK SW Engineer</Header>
                  <Header as="h5">13 years experience</Header>
                </div>
              </Grid.Row>
              <Grid.Row>
                <p>
                  From automation to product delivery, I've gained valuable
                  experience and had the privilege of connecting with incredible
                  individuals along the way!
                </p>
              </Grid.Row>
              <Grid.Row>
                <p>
                  I'm excited to share that I've joined the outstanding team at
                  Les Schwab HQ! This marks not only a thrilling new chapter in
                  my professional journey but also a meaningful personal
                  milestone, as my family embarks on an exciting new adventure
                  in the stunning landscapes of Central Oregon.
                </p>
              </Grid.Row>
              <Grid.Row>
                <ContactInfo />
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column only="computer">
            <div
              style={{
                margin: 'auto',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Map />
            </div>
          </Grid.Column>
        </Grid.Row>
      </HomeGrid>
    </Container>
  )
}
