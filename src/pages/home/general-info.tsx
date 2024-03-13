import { Segment, Grid, Image, Header } from 'semantic-ui-react'
import cartoonImage from '../../assets/warm-cartoon.jpg'
import { WelcomeInfo } from '../../data/about'

type GeneralInfoProps = {
  className?: string
}

export function GeneralInfo({ className }: GeneralInfoProps) {
  return (
    <Segment className={className}>
      <Grid stackable relaxed columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Grid className="info">
              <Grid.Row>
                <Grid.Column>
                  <Header as="h2" className="greeting">
                    Hello!
                  </Header>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>{WelcomeInfo.overview}</Grid.Column>
              </Grid.Row>
              <Grid.Row className="originStory">
                <Grid.Column>{WelcomeInfo.originStory}</Grid.Column>
              </Grid.Row>
              <Grid.Row className="workStory">
                <Grid.Column>{WelcomeInfo.workOverview}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column>
            <Image
              src={cartoonImage}
              alt="Cartoon Me"
              className="cartoonPicture"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}
