import TechnicalSkills from '../../components/radar-chart'
import { technicalData } from '../../data/skills'
import './skills.scss'
import { Container, Tab } from 'semantic-ui-react'

const panes = [
  {
    menuItem: 'Technical Skills',
    render: () => (
      <Tab.Pane attached={false}>
        <TechnicalSkills data={technicalData} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Interpersonal Skills',
    render: () => <Tab.Pane attached={false}>Skills</Tab.Pane>,
  },
  {
    menuItem: 'Leadership Skills',
    render: () => <Tab.Pane attached={false}>Skills</Tab.Pane>,
  },
]

function Skills() {
  return (
    <Container>
      <Tab
        className="skills"
        menu={{ fluid: true, vertical: true, tabular: true }}
        panes={panes}
      />
    </Container>
  )
}

export default Skills
