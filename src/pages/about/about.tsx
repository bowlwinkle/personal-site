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
      <>
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
      </>
    )
  })

  return (
    <Container>
      <Grid>
        <Grid.Column>
          <Header size="large">THINGS ABOUT ME</Header>
          {/* <Header size="large">Things about me</Header> */}
          <Accordion className="about" styled width="100%">
            {meFactsNodes}
          </Accordion>
        </Grid.Column>
      </Grid>
    </Container>
  )
}
