import './about.scss'
import {
  Accordion,
  Icon,
  AccordionTitleProps,
  Header,
  Grid,
  Container,
} from 'semantic-ui-react'
import { useState } from 'react'
import { FAQ } from '../../data/about'
import { GeneralInfo } from './general-info'

export function About() {
  const [activeIndex, setActiveIndex] = useState(-1)
  function handleClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    titleProps: AccordionTitleProps
  ) {
    const index: number = titleProps.index as number
    setActiveIndex(activeIndex === index ? -1 : index)
  }

  const meFactsNodes = FAQ.map((fact, i) => {
    return (
      <div key={`accordion-item-${i}`}>
        <Accordion.Title
          active={activeIndex === i}
          index={i}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          {fact.question}
        </Accordion.Title>
        <Accordion.Content active={activeIndex === i} className="tabContent">
          <div className="tabContent">
            <p>{fact.answer}</p>
            {fact.additionalContent}
          </div>
        </Accordion.Content>
      </div>
    )
  })

  return (
    <Container>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <GeneralInfo />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Header size="large">THINGS ABOUT ME</Header>
        </Grid.Row>
        <Grid.Row>
          <Accordion className="about" styled width="100%">
            {meFactsNodes}
          </Accordion>
        </Grid.Row>
      </Grid>
    </Container>
  )
}
