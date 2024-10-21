import { Segment, Grid, Image, Header } from 'semantic-ui-react'
import cartoonImage from '../../assets/me-with-effects.jpg'
import { AboutContent } from '../../data/general'
import { ContactInfo } from '../../components/contact'

type GeneralInfoProps = {
  className?: string
}

export function GeneralInfo({ className }: GeneralInfoProps) {
  return (
    <>
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
                  <Grid.Column>
                    <AboutContent />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
            <Grid.Column>
              <Image
                src={cartoonImage}
                alt="Cartoon Me"
                className="cartoonPicture"
                lazy
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment>
        <Grid stackable relaxed centered className={className}>
          <Grid.Row>
            <ContactInfo />
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  )
}
