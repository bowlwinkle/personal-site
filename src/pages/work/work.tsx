import {
  Container,
  Tab,
  Message,
  Statistic,
  StatisticValue,
  StatisticLabel,
  Grid,
  Divider,
} from 'semantic-ui-react'
import { Timeline } from './timeline'
import { useSearchParams } from 'react-router-dom'
import { generateTabParams } from '../helpers'

const panes = [
  {
    menuItem: 'Timeline',
    render: () => (
      <Tab.Pane attached={false}>
        <Timeline />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Resume',
    render: () => (
      <Tab.Pane attached={false}>
        <embed
          src="./LucasGansbergResume.pdf"
          width="100%"
          height="1300px"
          type="application/pdf"
        />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Projects',
    render: () => (
      <Tab.Pane attached={false}>
        <Container>
          <Message>
            <p>
              Just about all the projects I have worked on are not available to
              the public, so this section is to provide some more details and
              some metrics.
            </p>
          </Message>
          <Grid columns={2} textAlign="center">
            <Divider vertical>Or</Divider>
            <p>Description</p>
            <Grid columns={2} stackable textAlign="center">
              <Statistic>
                <StatisticValue>5000</StatisticValue>
                <StatisticLabel>Downloads</StatisticLabel>
              </Statistic>
            </Grid>
          </Grid>
        </Container>
      </Tab.Pane>
    ),
  },
]

export function WorkHistory() {
  const [queryParams, setQueryParams] = useSearchParams()
  const tabKey = 'tab'

  return (
    <Container>
      <Tab
        defaultActiveIndex={String(queryParams.get(tabKey) || 0)}
        menu={{ fluid: true, tabular: true }}
        panes={panes}
        onTabChange={(e, data) =>
          setQueryParams(generateTabParams(tabKey, data.activeIndex))
        }
      />
    </Container>
  )
}
