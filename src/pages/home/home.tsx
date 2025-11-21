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
    <>
      <Container className="home">
        <HomeGrid>
          <Grid.Row centered>
            <Grid.Column>
              <Grid className="homeDetails">
                <Grid.Row>
                  <Header as="h1">Lucas Gansberg</Header>
                </Grid.Row>
                <Grid.Row>
                  <Header as="h3">FULL STACK DEVELOPER</Header>
                </Grid.Row>
                <Grid.Row>
                  <p>I love to build and fix things</p>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    I am in a new chapter of my life raising a beautiful
                    daughter and trying to make it in a town I love.
                  </p>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    I am not sure where I'm going to end up, but I know it's
                    going to be something I love. I am exploring the life I
                    have, as I live it.
                  </p>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    Take a look around and see what I have been up to. Maybe our
                    paths will cross.
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
    </>
  )
}
