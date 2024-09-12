import './skills.scss'

import TechnicalSkills from '../../components/radar-chart'
import { SkillsOverTime } from '../../components/line-chart'
import { pastTechData, Skill, technicalData } from '../../data/skills'
import {
  Grid,
  Header,
  List,
  ListContent,
  ListItem,
  Message,
  Tab,
} from 'semantic-ui-react'
import { useSearchParams } from 'react-router-dom'
import { generateTabParams } from '../helpers'
import { Done } from '../done'

const panes = [
  {
    menuItem: 'Current Technical Skills',
    render: () => (
      <>
        <Done />
        <Tab.Pane attached={false}>
          <TechnicalSkills data={technicalData} />
        </Tab.Pane>
      </>
    ),
  },
  {
    menuItem: 'Previous Technical Skills',
    render: () => (
      <>
        <Done />
        <Tab.Pane attached={false}>
          <Message>
            <p>
              Rated how I viewed myself when actively using them. It's been a
              while since I've used these, but I pick things back up pretty
              quickly.
            </p>
          </Message>
          <TechnicalSkills data={pastTechData} />
        </Tab.Pane>
      </>
    ),
  },
  {
    menuItem: 'Skills Over Time',
    render: () => (
      <>
        <Done />
        <Tab.Pane attached={false}>
          <Message>
            <p>
              Not everything I've used professionally. Personal opinion on how
              proficient I am with a boiled down list of skills.
            </p>
          </Message>
          <SkillsOverTime />
        </Tab.Pane>
      </>
    ),
  },
  {
    menuItem: 'Used Professionally',
    render: () => (
      <>
        <Done />
        <Tab.Pane attached={false}>
          <List>
            {Object.values(Skill).map((skill) => {
              return (
                <ListItem>
                  <ListContent>{skill}</ListContent>
                </ListItem>
              )
            })}
          </List>
        </Tab.Pane>
      </>
    ),
  },
]

function Skills() {
  const [queryParams, setQueryParams] = useSearchParams()
  const tabKey = 'tab'

  return (
    <>
      <Done />
      <Grid columns={1}>
        <Grid.Column>
          <Header as="h3">How I see myself as a developer</Header>
        </Grid.Column>
        <Grid.Column>
          <p>
            Over the years I've worked with many different languages,
            technologies, and frameworks. I've put together a couple of charts
            with the recent stack I've worked with and some others things I've
            done in my time in the industry.
          </p>
          <p>
            I think it's important to state that, I believe that every developer
            is constantly learning and that's the skill that is most important.
            There might be a rare case of a true master but an expert in a
            certain language or technology isn't what a developer should be
            striving towards. The ability to learn and apply those techniques or
            ideas is the ideal skill to have. I am a a jack of many trades but I
            am master of none.
          </p>
          <Message>
            <p>All skills are personally rated from 1 - 100</p>
          </Message>
        </Grid.Column>

        <Grid.Column>
          <Header as="h3">Skills</Header>
        </Grid.Column>
        <Grid.Column>
          <Tab
            className="skills"
            defaultActiveIndex={String(queryParams.get(tabKey) || 0)}
            menu={{ fluid: true, vertical: true, tabular: true }}
            panes={panes}
            onTabChange={(e, data) =>
              setQueryParams(generateTabParams(tabKey, data.activeIndex))
            }
          />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Skills
