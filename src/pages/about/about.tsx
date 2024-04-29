import { Grid, Container } from 'semantic-ui-react'
import { GeneralInfo } from './general-info'

export function About() {
  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <GeneralInfo />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
