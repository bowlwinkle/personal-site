import {
  Card,
  CardGroup,
  Container,
  Grid,
  Header,
  Image,
  Statistic,
  StatisticLabel,
  StatisticValue,
} from 'semantic-ui-react'
import MountainPic from '../../assets/splash/mountain.jpg'

const joinedIndustry = '2011-06-18T00:00:00'
const engManagerBeginning = '2021-03-15T00:00:00'

function getYears(specificDate: Date) {
  const calculatedDifference =
    new Date().getTime() - new Date(specificDate).getTime()
  return Math.abs(new Date(calculatedDifference).getUTCFullYear() - 1970)
}

function Home() {
  const totalWorkExp = getYears(new Date(joinedIndustry))
  const engManagerWorkExp = getYears(new Date(engManagerBeginning))
  const sweWorkExp = totalWorkExp - engManagerWorkExp

  return (
    <>
      <Container>
        <Grid columns={1}>
          <Grid.Row>
            <Header
              as="h1"
              style={{
                position: 'absolute',
                top: '20%',
                left: '20%',
                color: 'whitesmoke',
              }}
            >
              Lucas Gansberg
            </Header>
            <Header
              as="h3"
              style={{
                position: 'absolute',
                top: '22%',
                left: '25%',
                color: 'whitesmoke',
              }}
            >
              Full Stack Developer
            </Header>
            <Image src={MountainPic} style={{ zIndex: -1 }} rounded />
          </Grid.Row>
          <Grid.Row>
            <Container>
              <CardGroup itemsPerRow={3}>
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
              </CardGroup>
            </Container>
          </Grid.Row>
          <Grid.Row>
            <Container text textAlign="left">
              <p style={{ fontSize: '1.33em' }}>
                I've been in the tech industry for <b>{totalWorkExp}</b> years
                and counting. I've been an individual contributor for{' '}
                <b>{sweWorkExp}</b> and was an engineering manager for{' '}
                <b>{engManagerWorkExp}</b>. I do not have any externally facing
                projects but checkout my resume, skills, and a little bit about
                me!
              </p>
              <p style={{ fontSize: '1.33em' }}>
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

export default Home
