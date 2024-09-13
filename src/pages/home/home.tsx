import './home.scss'
import { Container, Grid, Header } from 'semantic-ui-react'
import { ContactInfo } from '../../components/contact'
import { Map } from '../../components/animations/map'

export function Home() {
  return (
    <>
      <Container className="home">
        <Grid columns={2} relaxed centered>
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
                  <p>
                    I have a passion to create and deliver quality software
                    through innovation and exploration.
                  </p>
                </Grid.Row>
                <Grid.Row>
                  <p>
                    Most people try to have a 5 or 10 year plan, laying out
                    where exactly they want to be. I'm not sure where I'm going
                    to end up, but I know it's going to be something I'll love.
                    I am exploring the life I have, as I live it.
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
        </Grid>
      </Container>
      <div className="pointlessBackground3" />
    </>
  )
}
