import { Container } from 'semantic-ui-react'
import { GeneralInfo } from './general-info'

function Home() {
  return (
    <Container className="welcome">
      <div className="weirdDiv" />
      <div className="weirdDiv2" />
      <GeneralInfo />
    </Container>
  )
}

export default Home
