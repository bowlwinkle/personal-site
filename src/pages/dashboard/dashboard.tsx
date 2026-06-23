import React, { useEffect, useState } from 'react'
import { Container, Grid, Header, Segment, Image, Button, Icon, Message, List, Label, Loader, Divider } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useGoogleAuth } from '../../features/google_auth_context'
import { TaskItem, CalendarEvent } from '../../features/google_workspace_sync'
import './dashboard.scss'

export function DashboardPage() {
  const { authState, login, logout, fetchTasks, fetchUpcomingEvents, deleteCalendarEvent } = useGoogleAuth()
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending')
  const [activeCalendarTab, setActiveCalendarTab] = useState<'buffers' | 'all'>('buffers')
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const loadData = async () => {
    if (!authState.isAuthenticated) return
    setLoading(true)
    setApiError(null)
    try {
      const [fetchedTasks, fetchedEvents] = await Promise.all([
        fetchTasks(),
        fetchUpcomingEvents(30)
      ])
      setTasks(fetchedTasks)
      setEvents(fetchedEvents)
    } catch (err: any) {
      setApiError(err.message || 'Failed to fetch Google Workspace data. Please check your credentials or API configurations.')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this calendar event?')) {
      return
    }
    setDeletingId(eventId)
    try {
      await deleteCalendarEvent(eventId)
      setEvents((prev) => prev.filter((e) => e.id !== eventId))
    } catch (err: any) {
      alert(`Error deleting calendar event: ${err.message}`)
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    loadData()
  }, [authState.isAuthenticated])

  // STATE 1: Whitelist check failed (403 Unauthorized)
  if (authState.error && !authState.isAuthenticated) {
    return (
      <Container className="dashboardContainer fade-in">
        <Segment className="glassPanel errorPanel text-center">
          <div className="errorContent">
            <div className="errorIconContainer">
              <Icon name="ban" size="huge" className="unauthorizedIcon" />
            </div>
            <Header as="h1" className="unauthorizedHeader">403: Access Denied</Header>
            <Divider className="panelDivider" />
            <p className="unauthorizedText">
              This dashboard belongs exclusively to <strong>lucas.gansberg@gmail.com</strong>.
            </p>
            <p className="unauthorizedSubtext">
              {authState.error}
            </p>
            <div className="errorActions">
              <Button color="red" icon labelPosition="left" onClick={login} disabled={authState.isValidating}>
                <Icon name="google" />
                Try Another Account
              </Button>
              <Button as={Link} to="/" basic color="grey" icon labelPosition="left">
                <Icon name="home" />
                Return to Home
              </Button>
            </div>
          </div>
        </Segment>
      </Container>
    )
  }

  // STATE 2: Unauthenticated (Show Google Admin login screen)
  if (!authState.isAuthenticated) {
    return (
      <Container className="dashboardContainer fade-in">
        <Segment className="glassPanel loginPanel text-center">
          <div className="loginContent">
            <div className="loginIconContainer">
              <Icon name="lock" size="huge" className="lockIcon" />
            </div>
            <Header as="h1" className="loginHeader">Admin Portal</Header>
            <p className="loginSubtext">
              Sign in with your Google Admin account to authorize and view the private dashboard sync pipeline.
            </p>
            <Divider className="panelDivider" />
            <div className="loginActions">
              <Button color="google plus" icon labelPosition="left" size="large" onClick={login} loading={authState.isValidating} disabled={authState.isValidating}>
                <Icon name="google" />
                Sign in with Google
              </Button>
              <Button as={Link} to="/" basic color="grey" icon labelPosition="left">
                <Icon name="home" />
                Return to Home
              </Button>
            </div>
          </div>
        </Segment>
      </Container>
    )
  }

  // STATE 3: Authenticated and Whitelisted (Milestone Dashboard)
  const { profile } = authState

  const pendingTasks = tasks.filter(t => t.status === 'needsAction')
  const completedTasks = tasks.filter(t => t.status === 'completed')
  const displayedTasks = activeTab === 'pending' ? pendingTasks : completedTasks

  const formatDateTime = (dateTimeStr?: string, dateStr?: string) => {
    if (dateTimeStr) {
      const date = new Date(dateTimeStr)
      return date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' }) + ' at ' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
    }
    if (dateStr) {
      const date = new Date(dateStr)
      const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
      return localDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) + ' (All Day)'
    }
    return 'No date'
  }

  const formatTaskDueDate = (dueStr?: string) => {
    if (!dueStr) return null
    const date = new Date(dueStr)
    const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000)
    return localDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  return (
    <Container className="dashboardContainer fade-in">
      {/* Dashboard Top Header */}
      <Segment className="glassPanel headerPanel">
        <div className="headerLeft">
          <Icon name="dashboard" size="large" className="dashboardLogoIcon" />
          <div>
            <Header as="h1" className="dashboardHeader">Milestone Dashboard</Header>
            <span className="dashboardSubheader">Google Workspace Sync Pipeline Active</span>
          </div>
        </div>
        
        {profile && (
          <div className="headerRight">
            <div className="profileBadge">
              <Image src={profile.picture} avatar className="avatarBorder" />
              <div className="profileInfo">
                <span className="profileName">{profile.name}</span>
                <span className="profileEmail">{profile.email}</span>
              </div>
            </div>
            <Button icon labelPosition="left" color="blue" basic className="refreshBtn" onClick={loadData} disabled={loading}>
              <Icon name="refresh" loading={loading} />
              Refresh
            </Button>
            <Button icon labelPosition="left" color="red" basic className="logoutBtn" onClick={logout}>
              <Icon name="log out" />
              Sign Out
            </Button>
          </div>
        )}
      </Segment>

      {apiError && (
        <Message negative className="glassMessage">
          <Message.Header>API Request Failure</Message.Header>
          <p>{apiError}</p>
        </Message>
      )}

      {loading && !tasks.length && !events.length ? (
        <Segment className="glassPanel loaderPanel">
          <Loader active inline="centered" size="large" content="Fetching Tasks and Calendar Events..." />
        </Segment>
      ) : (
        <Grid stackable columns={2}>
          <Grid.Row>
            {/* LEFT COLUMN: Google Tasks */}
            <Grid.Column width={9}>
              <Segment className="glassPanel contentSection">
                <div className="sectionHeader">
                  <div className="titleArea">
                    <Icon name="tasks" className="sectionIcon blueIcon" />
                    <Header as="h2">Master Milestones</Header>
                  </div>
                  
                  <div className="taskTabButtons">
                    <Button 
                      compact 
                      className={`tabBtn ${activeTab === 'pending' ? 'active' : ''}`}
                      onClick={() => setActiveTab('pending')}
                    >
                      Pending ({pendingTasks.length})
                    </Button>
                    <Button 
                      compact 
                      className={`tabBtn ${activeTab === 'completed' ? 'active' : ''}`}
                      onClick={() => setActiveTab('completed')}
                    >
                      Completed ({completedTasks.length})
                    </Button>
                  </div>
                </div>

                <Divider className="panelDivider" />

                {displayedTasks.length === 0 ? (
                  <div className="emptyState">
                    <Icon name="check circle outline" size="huge" className="emptyIcon" />
                    <p className="emptyText">No {activeTab} tasks found in your 'Master Milestones' list.</p>
                  </div>
                ) : (
                  <List divided relaxed className="itemList scrollableList">
                    {displayedTasks.map((task) => (
                      <List.Item key={task.id} className="taskItemCard">
                        <List.Content>
                          <div className="taskTitleRow">
                            <span className={`taskTitle ${task.status === 'completed' ? 'strikeThrough' : ''}`}>
                              {task.title || 'Untitled Task'}
                            </span>
                            {task.due && (
                              <Label basic size="small" className={`dueLabel ${new Date(task.due) < new Date() && task.status !== 'completed' ? 'overdue' : ''}`}>
                                <Icon name="calendar alternate outline" />
                                {formatTaskDueDate(task.due)}
                              </Label>
                            )}
                          </div>
                          {task.notes && (
                            <p className="taskNotes">{task.notes}</p>
                          )}
                          <div className="taskFooter">
                            <span className="updatedTime">
                              Last updated: {new Date(task.updated).toLocaleDateString()}
                            </span>
                            {task.status === 'completed' ? (
                              <Label color="green" size="mini" horizontal>Completed</Label>
                            ) : (
                              <Label color="orange" size="mini" horizontal>Active</Label>
                            )}
                          </div>
                        </List.Content>
                      </List.Item>
                    ))}
                  </List>
                )}
              </Segment>
            </Grid.Column>

            {/* RIGHT COLUMN: Google Calendar */}
            <Grid.Column width={7}>
              <Segment className="glassPanel contentSection">
                <div className="sectionHeader">
                  <div className="titleArea">
                    <Icon name="calendar alternate" className="sectionIcon purpleIcon" />
                    <Header as="h2">Upcoming Events</Header>
                  </div>

                  <div className="taskTabButtons">
                    <Button 
                      compact 
                      className={`tabBtn ${activeCalendarTab === 'buffers' ? 'active' : ''}`}
                      onClick={() => setActiveCalendarTab('buffers')}
                    >
                      Buffers Only
                    </Button>
                    <Button 
                      compact 
                      className={`tabBtn ${activeCalendarTab === 'all' ? 'active' : ''}`}
                      onClick={() => setActiveCalendarTab('all')}
                    >
                      All Events
                    </Button>
                  </div>
                </div>

                <Divider className="panelDivider" />

                {(() => {
                  const filteredEvents = activeCalendarTab === 'buffers' 
                    ? events.filter((event) => {
                        const title = event.summary.toLowerCase()
                        return title.includes('prep') || title.includes('buffer') || title.includes('milestone')
                      })
                    : events

                  if (filteredEvents.length === 0) {
                    return (
                      <div className="emptyState">
                        <Icon name="calendar outline" size="huge" className="emptyIcon" />
                        <p className="emptyText">
                          {activeCalendarTab === 'buffers' 
                            ? 'No upcoming prep buffers or milestones scheduled.' 
                            : 'No upcoming calendar events scheduled.'}
                        </p>
                      </div>
                    )
                  }

                  return (
                    <List divided relaxed className="itemList scrollableList">
                      {filteredEvents.map((event) => {
                        const isBuffer = event.summary.toLowerCase().includes('prep') || 
                                         event.summary.toLowerCase().includes('buffer') || 
                                         event.summary.toLowerCase().includes('milestone');
                        
                        return (
                          <List.Item key={event.id} className={`eventItemCard ${isBuffer ? 'bufferHighlight' : ''}`}>
                            <div className="eventItemContainer">
                              <div className="eventItemDetails">
                                <div className="eventHeaderRow">
                                  <span className="eventSummary">{event.summary}</span>
                                  {isBuffer && (
                                    <Label color="violet" size="mini" className="bufferLabel">
                                      <Icon name="shield" />
                                      Buffer
                                    </Label>
                                  )}
                                </div>
                                <div className="eventTime">
                                  <Icon name="clock outline" />
                                  {formatDateTime(event.start.dateTime, event.start.date)}
                                </div>
                                {event.description && (
                                  <p className="eventDescription">{event.description}</p>
                                )}
                              </div>
                              <div className="eventItemActions">
                                <Button 
                                  icon="trash" 
                                  color="red" 
                                  basic 
                                  size="mini" 
                                  title="Delete Event"
                                  loading={deletingId === event.id}
                                  disabled={deletingId !== null}
                                  onClick={() => handleDeleteEvent(event.id)}
                                />
                              </div>
                            </div>
                          </List.Item>
                        )
                      })}
                    </List>
                  )
                })()}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  )
}
