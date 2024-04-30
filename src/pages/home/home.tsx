import './home.scss'
import {
  Card,
  Container,
  Grid,
  Header,
  Image,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from 'semantic-ui-react'
import MountainPic from '../../assets/splash/mountain.jpg'
import { Media } from '../../components/media'

const joinedIndustry = '2011-06-18T00:00:00'
const engManagerBeginning = '2021-03-15T00:00:00'

function getYears(specificDate: Date) {
  const calculatedDifference =
    new Date().getTime() - new Date(specificDate).getTime()
  return Math.abs(new Date(calculatedDifference).getUTCFullYear() - 1970)
}

export function Home() {
  const totalWorkExp = getYears(new Date(joinedIndustry))
  const engManagerWorkExp = getYears(new Date(engManagerBeginning))
  const sweWorkExp = totalWorkExp - engManagerWorkExp

  return (
    <>
      <Container className="home">
        <Grid columns={1}>
          <Grid.Row>
            <Header as="h1" inverted>
              Lucas Gansberg
            </Header>
            <Header
              as="h3"
              inverted
              style={{
                top: '22%',
                left: '25%',
              }}
            >
              Full Stack Developer
            </Header>
            <Media greaterThan="mobile">
              <Image src={MountainPic} rounded />
            </Media>
            <Media at="mobile">
              <Image src={MountainPic} />
            </Media>
          </Grid.Row>
          <Grid.Row>
            <Container>
              <Card.Group centered>
                <Card>
                  <Statistic>
                    <StatisticValue>{totalWorkExp}</StatisticValue>
                    <StatisticLabel>Years Exp</StatisticLabel>
                  </Statistic>
                </Card>
                <Card>
                  <Statistic>
                    <StatisticValue>{sweWorkExp}</StatisticValue>
                    <StatisticLabel>Developer Exp</StatisticLabel>
                  </Statistic>
                </Card>
                <Card>
                  <Statistic>
                    <StatisticValue>{engManagerWorkExp}</StatisticValue>
                    <StatisticLabel>Manager Exp</StatisticLabel>
                  </Statistic>
                </Card>
              </Card.Group>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Container textAlign="left">
              <p>
                I've been in the tech industry for <b>{totalWorkExp}</b> years
                and counting. I've been an individual contributor for{' '}
                <b>{sweWorkExp}</b> and was an engineering manager for{' '}
                <b>{engManagerWorkExp}</b>. I do not have any externally facing
                projects but checkout my resume, skills, and a little bit about
                me!
              </p>
              <p>
                I love learning as I go and I love the people that I meet on the
                way. The end goal for my career is still unknown, but I keep
                climbing.
              </p>
            </Container>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  )
}
