import RedactedPNG from '../../assets/redacted.png'
import {
  Divider,
  Grid,
  Image,
  Label,
  LabelGroup,
  Message,
  Search,
  SearchProps,
  Statistic,
  StatisticLabel,
  StatisticValue,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react'
import { projects, Project } from '../../data/projects'
import React, { useReducer } from 'react'
import Fuse from 'fuse.js'
import { Media } from '../../components/media'

const initialState = { results: projects, loading: false, value: '' }

enum REDUCER_ACTION_TYPE {
  RESET,
  ALTER_SORT,
  CLEAN_QUERY,
  START_SEARCH,
  FINISH_SEARCH,
  UPDATE_SELECTION,
}

enum SORT_DIRECTION {
  ASCENDING = 'ascending',
  DESCENDING = 'descending',
}

type ProjectAction = {
  type: REDUCER_ACTION_TYPE
  column?: string
  query?: string
  results: Project[]
  selection?: string
}

type ProjectState = {
  column?: keyof Project
  direction?: SORT_DIRECTION
  loading?: boolean
  value?: string
  results: Project[]
}

function projectReducer(
  state: ProjectState,
  action: ProjectAction
): ProjectState {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ALTER_SORT:
      if (state.column === action.column) {
        return {
          ...state,
          results: state.results.slice().reverse(),
          direction:
            state.direction === SORT_DIRECTION.ASCENDING
              ? SORT_DIRECTION.DESCENDING
              : SORT_DIRECTION.ASCENDING,
        }
      }

      return {
        column: action.column as keyof Project,
        results: state.results.sort((a, b) => {
          if (
            a[action.column as keyof Project] <
            b[action.column as keyof Project]
          ) {
            return -1
          }
          if (
            a[action.column as keyof Project] >
            b[action.column as keyof Project]
          ) {
            return 1
          }
          return 0
        }),
        direction: SORT_DIRECTION.ASCENDING,
      }

    case REDUCER_ACTION_TYPE.RESET:
      return { ...state }

    case REDUCER_ACTION_TYPE.CLEAN_QUERY:
      return initialState
    case REDUCER_ACTION_TYPE.START_SEARCH:
      return { ...state, loading: true, value: action.query }
    case REDUCER_ACTION_TYPE.FINISH_SEARCH:
      return { ...state, loading: false, results: action.results }
    case REDUCER_ACTION_TYPE.UPDATE_SELECTION:
      return { ...state, value: action.selection }

    default:
      throw new Error()
  }
}

export function Projects() {
  const [state, dispatch] = useReducer(projectReducer, initialState)

  // Sort actions
  const { column, direction, loading, results, value } = state
  const headerCellProps = (
    columnName: string
  ): { sorted: SORT_DIRECTION | undefined; onClick: () => void } => ({
    sorted: column === columnName ? direction : undefined,
    onClick: () =>
      dispatch({
        ...state,
        type: REDUCER_ACTION_TYPE.ALTER_SORT,
        column: columnName,
      }),
  })

  // Search actions
  const timeoutRef = React.useRef(setTimeout(() => {}, 0))
  const handleSearchChange = React.useCallback(
    (_: React.MouseEvent<HTMLElement, MouseEvent>, data: SearchProps) => {
      clearTimeout(timeoutRef.current)
      dispatch({
        ...state,
        type: REDUCER_ACTION_TYPE.START_SEARCH,
        query: data.value,
      })

      timeoutRef.current = setTimeout(() => {
        if (data.value?.length === 0) {
          dispatch({ ...state, type: REDUCER_ACTION_TYPE.CLEAN_QUERY })
          return
        }

        const fuseOptions = {
          keys: ['name', 'overview', 'builtWith', 'builtFor', 'workType'],
          caseSensitive: false,
          includeScore: true,
          threshold: 0.2,
        }

        const projectIndex = Fuse.createIndex(fuseOptions.keys, projects)
        const fuse = new Fuse<Project>(projects, fuseOptions, projectIndex)
        const searchResults = fuse.search(String(data.value))

        dispatch({
          type: REDUCER_ACTION_TYPE.FINISH_SEARCH,
          results: searchResults.map((r) => r.item),
        })
      }, 300)
    },
    []
  )

  React.useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <>
      <Message>
        <p>
          I hope most understand timeline is a bit tricky here. Once you build,
          you maintain so there is overlap. Some project names have been
          redacted.
        </p>
      </Message>
      <Grid columns={3} verticalAlign="middle" stretched>
        <Grid.Column>
          <Search
            loading={loading}
            placeholder="Search..."
            onResultSelect={(e, data) =>
              dispatch({
                ...state,
                type: REDUCER_ACTION_TYPE.UPDATE_SELECTION,
                selection: data.result.title,
              })
            }
            onSearchChange={handleSearchChange}
            results={results.map((r) => ({ title: r.name }))}
            value={value}
            open={false}
          />
        </Grid.Column>

        <Grid.Column>
          <Media greaterThan="mobile">
            <Divider />
          </Media>
        </Grid.Column>
        <Grid.Column>
          <Media greaterThan="mobile">
            <Statistic size="mini">
              <StatisticValue>{results.length}</StatisticValue>
              <StatisticLabel>Results</StatisticLabel>
            </Statistic>
          </Media>
        </Grid.Column>
      </Grid>

      <Table padded sortable>
        <TableHeader>
          <TableRow>
            <TableHeaderCell width={2} {...headerCellProps('year')}>
              Year
            </TableHeaderCell>
            <TableHeaderCell width={1}>Name</TableHeaderCell>
            <TableHeaderCell>Summary</TableHeaderCell>
            <TableHeaderCell {...headerCellProps('for')}>
              Built for
            </TableHeaderCell>
            <TableHeaderCell>Built with</TableHeaderCell>
            <TableHeaderCell>Work Type</TableHeaderCell>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.length > 0
            ? results.map((project: Project) => {
                return (
                  <TableRow key={project.name}>
                    <TableCell>{project.year}</TableCell>
                    <TableCell>
                      {project.redacted ? (
                        <Image size="tiny" src={RedactedPNG} lazy />
                      ) : (
                        project.name
                      )}
                    </TableCell>
                    <TableCell>{project.overview}</TableCell>
                    <TableCell>
                      <b style={{ display: 'none' }}>{project.builtFor}</b>
                      <Image size="mini" src={project.icon} />
                    </TableCell>
                    <TableCell>
                      <LabelGroup className="buildLabels">
                        {project.builtWith.map((b) => {
                          return (
                            <Label key={b} basic size="small">
                              {b}
                            </Label>
                          )
                        })}
                      </LabelGroup>
                    </TableCell>
                    <TableCell>
                      <LabelGroup className="workLabels">
                        {project.workType.map((b) => {
                          return (
                            <Label key={b} basic size="small">
                              {b}
                            </Label>
                          )
                        })}
                      </LabelGroup>
                    </TableCell>
                  </TableRow>
                )
              })
            : 'No results found'}
        </TableBody>
      </Table>
    </>
  )
}
