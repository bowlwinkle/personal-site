import './work.scss'
import { Container, Tab } from 'semantic-ui-react'
import { useSearchParams } from 'react-router-dom'
import { generateTabParams } from '../helpers'
import { Projects } from './projects'
import { useMemo } from 'react'

enum MENU {
  PROJECTS = 'Projects',
  RESUME = 'Resume',
  TIMELINE = 'Timeline',
}

const panes = [
  {
    menuItem: MENU.PROJECTS,
    render: () => (
      <Tab.Pane attached={false}>
        <Projects />
      </Tab.Pane>
    ),
  },
  {
    menuItem: MENU.RESUME,
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
]

export function WorkHistory() {
  const [queryParams, setQueryParams] = useSearchParams()
  const tabKey = 'tab'
  const defaultActiveIndex = useMemo(() => {
    if (!queryParams.get(tabKey)) {
      setQueryParams(generateTabParams(tabKey, MENU.PROJECTS))
      return 0
    } else {
      return panes.reduce((acc, pane, index) => {
        if (pane.menuItem === queryParams.get(tabKey)) {
          return index
        }
        return acc
      }, 0)
    }
  }, [queryParams, setQueryParams, tabKey])

  return (
    <Container>
      <Tab
        defaultActiveIndex={defaultActiveIndex}
        menu={{ fluid: true, tabular: true }}
        panes={panes}
        onTabChange={(e, data) => {
          setQueryParams(
            generateTabParams(tabKey, panes[Number(data.activeIndex)].menuItem)
          )
        }}
      />
    </Container>
  )
}
