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
    <div className="appContainer">
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
                    From automation testing & tools for wireless chips to full
                    stack application, I've had some amazing opportunities while
                    meeting great people along the way.
                  </p>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    I am actively looking for a new opportunity so please feel
                    free to reach out!
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
    </div>
  )
}
