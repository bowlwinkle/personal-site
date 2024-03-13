import { Grid, Card, Image } from 'semantic-ui-react'
import McCoy from '../assets/mccoy.jpg'
import Gus from '../assets/gus.jpg'

// Add eduction and use the semantic UI icon

export const WelcomeInfo = {
  overview:
    "My name is Lucas!  I have worked as professional software engineer since July 2011. I have worn many hats throughout the years and I'm always excited to kick off a new project!",
  originStory:
    "I'm from Southern Oregon, graduated from Oregon Institute of Technology",
  workOverview:
    "Most of my work has been internally facing or creating reference designs for customers, therefore it's difficult to share projects externally but I have years of experience of some of the things listed below",
}

export const FAQ = [
  {
    question: 'Do you have any pets?',
    answer:
      'Yes, I have two dogs.  A black labrador named McCoy, and a half yellow lab/german wirehaired pointer named Gus',
    additionalContent: (
      <Grid stackable columns={2}>
        <Grid.Column>
          <Card>
            <Image src={McCoy} alt="McCoy" />
            <Card.Content>
              <Card.Header>McCoy</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2017</span>
              </Card.Meta>
              <Card.Description>
                Super chill dog that loves to swim!
              </Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column>
          <Card>
            <Image src={Gus} alt="Gus" />
            <Card.Content>
              <Card.Header>Augustus</Card.Header>
              <Card.Meta>
                <span className="date">Joined in 2011</span>
              </Card.Meta>
              <Card.Description>Just an unstoppable force!</Card.Description>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    ),
  },
  {
    question: "What's your favorite thing to do while you're not at work?",
    answer:
      'I always have some kind of project in my shop and I like to tinker around; here are a few examples',
    additionalContent: 'Have a list of items',
  },
]
