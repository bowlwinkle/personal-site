import './skills.scss'

import TechnicalSkills from '../../components/radar-chart'
import { SkillsOverTime } from '../../components/line-chart'
import { pastTechData, Skill, technicalData } from '../../data/skills'
import {
  Divider,
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
import { Media } from '../../components/media'

const panes = [
  {
    menuItem: 'Current Technical Skills',
    render: () => (
      <>
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
      <Grid columns={1}>
        <Grid.Column>
          <Header as="h3">How I see myself as a engineer</Header>
        </Grid.Column>
        <Grid.Column>
          <p>
            I've worked with many different architectures, patterns, languages,
            technologies, frameworks, etc it's tedious for me to explain and
            boring to the reader. I've put together a couple of charts that
            detail how I rate myself with some of the things I've worked with. I
            am my worst critic!
          </p>
          <Message>
            <p>All skills are personally rated from 1 - 100</p>
          </Message>
        </Grid.Column>
        <Grid.Column>
          <Header as="h3">Skills</Header>
        </Grid.Column>
        <Grid.Column>
          <Media greaterThan="mobile">
            <Tab
              className="skills"
              defaultActiveIndex={String(queryParams.get(tabKey) || 0)}
              menu={{ fluid: true, vertical: true, tabular: true }}
              panes={panes}
              onTabChange={(e, data) =>
                setQueryParams(generateTabParams(tabKey, data.activeIndex))
              }
            />
          </Media>
          <Media at="mobile">
            <Grid className="skills skillsMobile">
              <Grid.Row>
                <Header as="h4">Current Technical Skills</Header>
                <Divider />
                <TechnicalSkills data={technicalData} />
              </Grid.Row>
              <Grid.Row>
                <Divider />
                <Header as="h4">Previous Technical Skills</Header>
                <Message>
                  <p>
                    Rated how I viewed myself when actively using them. It's
                    been a while since I've used these, but I pick things back
                    up pretty quickly.
                  </p>
                </Message>
                <TechnicalSkills data={pastTechData} />
              </Grid.Row>
              <Grid.Row>
                <Divider />
                <Header as="h4">Skills Over Time</Header>
                <Message>
                  <p>
                    Not everything I've used professionally. Personal opinion on
                    how proficient I am with a boiled down list of skills.
                  </p>
                </Message>
                <SkillsOverTime />
              </Grid.Row>
              <Grid.Row>
                <div>
                  <Divider />
                  <Header as="h4">Used Professionally</Header>
                  <List>
                    {Object.values(Skill).map((skill) => {
                      return (
                        <ListItem>
                          <ListContent>{skill}</ListContent>
                        </ListItem>
                      )
                    })}
                  </List>
                </div>
              </Grid.Row>
            </Grid>
          </Media>
        </Grid.Column>
      </Grid>
    </>
  )
}

export default Skills
