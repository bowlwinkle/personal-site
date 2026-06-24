import React, { useEffect, useState, useMemo } from 'react'
import { Container, Grid, Header, Segment, Image, Button, Icon, Message, List, Label, Loader, Divider, Input } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { useGoogleAuth } from '../../features/google_auth_context'
import { TaskItem, CalendarEvent } from '../../features/google_workspace_sync'
import './dashboard.scss'

export function DashboardPage() {
  const { authState, login, logout, fetchTasks, fetchUpcomingEvents, deleteCalendarEvent, updateTaskStatus, createTask, createCalendarEvent } = useGoogleAuth()
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  
  // Dashboard Action States
  const [activeTab, setActiveTab] = useState<'pending' | 'completed'>('pending')
  const [activeCalendarTab, setActiveCalendarTab] = useState<'buffers' | 'all'>('buffers')
  const [calendarTimeFilter, setCalendarTimeFilter] = useState<'all' | 'today' | 'week' | '2weeks'>('all')
  
  // Search States
  const [taskSearch, setTaskSearch] = useState('')
  const [calendarSearch, setCalendarSearch] = useState('')
  
  // Progress/Action states
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingTaskId, setTogglingTaskId] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [heatmapRange, setHeatmapRange] = useState<'4weeks' | 3 | 6 | 9 | 12>('4weeks')

  // Add Milestone Form States
  const [showAddMilestoneForm, setShowAddMilestoneForm] = useState(false)
  const [newMilestoneTitle, setNewMilestoneTitle] = useState('')
  const [newMilestoneNotes, setNewMilestoneNotes] = useState('')
  const [newMilestoneDue, setNewMilestoneDue] = useState('')
  const [addingMilestone, setAddingMilestone] = useState(false)

  // Add Event Form States
  const [showAddEventForm, setShowAddEventForm] = useState(false)
  const [newEventSummary, setNewEventSummary] = useState('')
  const [newEventStart, setNewEventStart] = useState('')
  const [newEventEnd, setNewEventEnd] = useState('')
  const [newEventDescription, setNewEventDescription] = useState('')
  const [addingEvent, setAddingEvent] = useState(false)

  // Calculations for MULTI-MONTH HEATMAP
  const heatmapDays = useMemo(() => {
    if (heatmapRange !== '4weeks') return []
    const days: Date[] = []
    const start = new Date()
    const current = new Date(start)
    for (let i = 0; i < 28; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    return days
  }, [heatmapRange])

  const getMonthCalendars = useMemo(() => {
    if (typeof heatmapRange !== 'number') return []
    const today = new Date()
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    const calendars = []
    
    for (let i = 0; i < heatmapRange; i++) {
      const date = new Date(today.getFullYear(), today.getMonth() + i, 1)
      const year = date.getFullYear()
      const month = date.getMonth()
      
      const monthTitle = date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
      const firstDayIndex = new Date(year, month, 1).getDay()
      const daysInMonth = new Date(year, month + 1, 0).getDate()
      
      const dayCells = []
      for (let s = 0; s < firstDayIndex; s++) {
        dayCells.push({ isSpacer: true, key: `spacer-${i}-${s}` })
      }
      
      for (let day = 1; day <= daysInMonth; day++) {
        const cellDate = new Date(year, month, day)
        const cellDateStart = new Date(year, month, day)
        const isActive = cellDateStart >= startOfToday
        
        dayCells.push({
          isSpacer: false,
          isActive,
          date: cellDate,
          dayNumber: day,
          key: `day-${year}-${month}-${day}`
        })
      }
      
      calendars.push({
        title: monthTitle,
        year,
        month,
        dayCells
      })
    }
    return calendars
  }, [heatmapRange])

  const loadData = async () => {
    if (!authState.isAuthenticated) return
    setLoading(true)
    setApiError(null)
    try {
      const [fetchedTasks, fetchedEvents] = await Promise.all([
        fetchTasks(),
        fetchUpcomingEvents(40)
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

  const handleToggleTask = async (task: TaskItem) => {
    const listId = task.listId || '@default'
    const isCompleted = task.status === 'completed'
    setTogglingTaskId(task.id)
    try {
      await updateTaskStatus(listId, task.id, !isCompleted)
      
      // Update local state statefully
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id
            ? { ...t, status: isCompleted ? 'needsAction' : 'completed', updated: new Date().toISOString() }
            : t
        )
      )
    } catch (err: any) {
      alert(`Failed to update task status: ${err.message}`)
    } finally {
      setTogglingTaskId(null)
    }
  }

  const handleAddMilestone = async () => {
    if (!newMilestoneTitle.trim()) return
    setAddingMilestone(true)
    try {
      const listId = tasks.length > 0 && tasks[0].listId ? tasks[0].listId : '@default'
      const createdTask = await createTask(listId, newMilestoneTitle, newMilestoneNotes, newMilestoneDue || undefined)
      
      setTasks((prev) => [createdTask, ...prev])
      setNewMilestoneTitle('')
      setNewMilestoneNotes('')
      setNewMilestoneDue('')
      setShowAddMilestoneForm(false)
    } catch (err: any) {
      alert(`Error creating milestone: ${err.message}`)
    } finally {
      setAddingMilestone(false)
    }
  }

  const handleAddEvent = async () => {
    if (!newEventSummary.trim() || !newEventStart || !newEventEnd) {
      alert('Please fill in Summary, Start Time, and End Time.')
      return
    }
    setAddingEvent(true)
    try {
      const createdEvent = await createCalendarEvent(newEventSummary, newEventStart, newEventEnd, newEventDescription || undefined)
      setEvents((prev) => [createdEvent, ...prev])
      setNewEventSummary('')
      setNewEventStart('')
      setNewEventEnd('')
      setNewEventDescription('')
      setShowAddEventForm(false)
    } catch (err: any) {
      alert(`Error creating event: ${err.message}`)
    } finally {
      setAddingEvent(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [authState.isAuthenticated])

  // Helper date formatting
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

  // Event Duration Calculator (Hours)
  const getEventDurationHours = (event: CalendarEvent): number => {
    if (event.start.dateTime && event.end.dateTime) {
      const start = new Date(event.start.dateTime)
      const end = new Date(event.end.dateTime)
      const diffMs = end.getTime() - start.getTime()
      return Math.max(0, diffMs / (1000 * 60 * 60))
    }
    return event.start.date ? 8 : 0 // All day defaults to 8 hours for heatmap
  }

  // STATE 1: Whitelist check failed (403 Unauthorized)
  const isWhitelistError = authState.error && (
    authState.error.toLowerCase().includes('unauthorized') || 
    authState.error.toLowerCase().includes('belongs exclusively')
  );

  if (isWhitelistError && !authState.isAuthenticated) {
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
            {authState.error && (
              <Message warning className="glassMessage" style={{ background: 'rgba(251, 189, 8, 0.1) !important', borderColor: 'rgba(251, 189, 8, 0.3) !important', color: '#fbbd08 !important', textAlign: 'left', marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Icon name="warning sign" />
                <div>{authState.error}</div>
              </Message>
            )}
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

  // STATE 3: Authenticated
  const { profile } = authState

  // Calculations for ANALYTICS CARD
  const pendingTasks = tasks.filter(t => t.status === 'needsAction')
  const completedTasks = tasks.filter(t => t.status === 'completed')

  const totalPrepBuffers = events.filter(e => {
    const title = e.summary.toLowerCase()
    return title.includes('prep') || title.includes('buffer') || title.includes('milestone')
  })

  const totalPrepTimeHours = totalPrepBuffers.reduce((sum, e) => sum + getEventDurationHours(e), 0)

  // Buffer Health calculation (Goal: at least 2 prep hours per pending milestone)
  const milestoneCount = pendingTasks.length
  let bufferHealthStatus = 'Healthy'
  let bufferHealthColor: 'green' | 'yellow' | 'red' = 'green'
  if (milestoneCount > 0) {
    const ratio = totalPrepTimeHours / milestoneCount
    if (ratio < 1) {
      bufferHealthStatus = 'Critical'
      bufferHealthColor = 'red'
    } else if (ratio < 2) {
      bufferHealthStatus = 'Warning'
      bufferHealthColor = 'yellow'
    }
  }



  const getHeatmapDayData = (date: Date) => {
    const dateStr = date.toDateString()
    const dayEvents = events.filter(e => {
      const eDate = e.start.dateTime ? new Date(e.start.dateTime) : e.start.date ? new Date(e.start.date) : null
      return eDate && eDate.toDateString() === dateStr
    })
    const totalHours = dayEvents.reduce((sum, e) => sum + getEventDurationHours(e), 0)
    return {
      events: dayEvents,
      hours: totalHours
    }
  }



  // Unified Search and Filter lists
  const filteredTasks = (activeTab === 'pending' ? pendingTasks : completedTasks).filter(t =>
    t.title.toLowerCase().includes(taskSearch.toLowerCase()) ||
    (t.notes && t.notes.toLowerCase().includes(taskSearch.toLowerCase()))
  )

  const calendarTimeFilterFunc = (event: CalendarEvent) => {
    if (calendarTimeFilter === 'all') return true
    const eventTime = event.start.dateTime 
      ? new Date(event.start.dateTime).getTime() 
      : event.start.date ? new Date(event.start.date).getTime() : 0
    
    const now = new Date()
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
    const endOfToday = startOfToday + 24 * 60 * 60 * 1000
    const endOfWeek = startOfToday + 7 * 24 * 60 * 60 * 1000
    const endOf2Weeks = startOfToday + 14 * 24 * 60 * 60 * 1000

    if (calendarTimeFilter === 'today') {
      return eventTime >= startOfToday && eventTime <= endOfToday
    }
    if (calendarTimeFilter === 'week') {
      return eventTime >= startOfToday && eventTime <= endOfWeek
    }
    if (calendarTimeFilter === '2weeks') {
      return eventTime >= startOfToday && eventTime <= endOf2Weeks
    }
    return true
  }

  const filteredCalendarEvents = events
    .filter(calendarTimeFilterFunc)
    .filter(event => {
      // Apply tab filters (Buffers vs All)
      if (activeCalendarTab === 'buffers') {
        const title = event.summary.toLowerCase()
        return title.includes('prep') || title.includes('buffer') || title.includes('milestone')
      }
      return true
    })
    .filter(event =>
      event.summary.toLowerCase().includes(calendarSearch.toLowerCase()) ||
      (event.description && event.description.toLowerCase().includes(calendarSearch.toLowerCase()))
    )

  const getDayDetails = (date: Date) => {
    const dateStr = date.toDateString()
    const dayEvents = events.filter(e => {
      const eDate = e.start.dateTime ? new Date(e.start.dateTime) : e.start.date ? new Date(e.start.date) : null
      return eDate && eDate.toDateString() === dateStr
    })
    const dayTasks = tasks.filter(t => {
      if (!t.due) return false
      const tDate = new Date(t.due)
      const localDate = new Date(tDate.getTime() + tDate.getTimezoneOffset() * 60000)
      return localDate.toDateString() === dateStr
    })
    return {
      events: dayEvents,
      tasks: dayTasks,
      totalHours: dayEvents.reduce((sum, e) => sum + getEventDurationHours(e), 0)
    }
  }

  return (
    <Container className="dashboardContainer fade-in">
      {/* 1. Header Segment */}
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

      {/* 2. Top Analytics Bar */}
      <Grid stackable columns={4} className="analyticsGrid">
        <Grid.Column>
          <Segment className="glassPanel analyticsCard">
            <div className="cardIconContainer blue">
              <Icon name="clock" />
            </div>
            <div className="cardInfo">
              <span className="cardLabel">Total Prep Time</span>
              <span className="cardValue">{totalPrepTimeHours.toFixed(1)} hrs</span>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment className="glassPanel analyticsCard">
            <div className="cardIconContainer purple">
              <Icon name="tasks" />
            </div>
            <div className="cardInfo">
              <span className="cardLabel">Active Milestones</span>
              <span className="cardValue">{milestoneCount} pending</span>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment className="glassPanel analyticsCard">
            <div className={`cardIconContainer ${bufferHealthColor}`}>
              <Icon name="heartbeat" />
            </div>
            <div className="cardInfo">
              <span className="cardLabel">Buffer Ratio Health</span>
              <span className="cardValue">{bufferHealthStatus}</span>
            </div>
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment className="glassPanel analyticsCard launchCard">
            <div className="cardIconContainer grey">
              <Icon name="external alternate" />
            </div>
            <div className="cardInfo">
              <span className="cardLabel">Workspace Launchers</span>
              <div className="launcherLinks">
                <a href="https://mail.google.com" target="_blank" rel="noreferrer">Mail</a>
                <span className="divider">|</span>
                <a href="https://calendar.google.com" target="_blank" rel="noreferrer">Calendar</a>
                <span className="divider">|</span>
                <a href="https://tasksboard.com" target="_blank" rel="noreferrer">Tasks</a>
              </div>
            </div>
          </Segment>
        </Grid.Column>
      </Grid>

      {/* 3. Multi-Month Workload Heatmap */}
      <Segment className="glassPanel heatmapSection">
        <div className="heatmapHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div className="titleArea" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Icon name="th" className="sectionIcon blueIcon" />
            <div>
              <Header as="h3" style={{ margin: 0, color: '#fff' }}>Calendar Workload Heatmap</Header>
              <span className="heatmapSubheader" style={{ fontSize: '0.85rem', opacity: 0.6 }}>
                Showing next {heatmapRange === '4weeks' ? '4 weeks' : `${heatmapRange} months`}
              </span>
            </div>
          </div>
          
          <div className="heatmapControls" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <Button compact className={`tabBtn ${heatmapRange === '4weeks' ? 'active' : ''}`} onClick={() => setHeatmapRange('4weeks')}>4 Weeks</Button>
              <Button compact className={`tabBtn ${heatmapRange === 3 ? 'active' : ''}`} onClick={() => setHeatmapRange(3)}>3 Months</Button>
              <Button compact className={`tabBtn ${heatmapRange === 6 ? 'active' : ''}`} onClick={() => setHeatmapRange(6)}>6 Months</Button>
              <Button compact className={`tabBtn ${heatmapRange === 9 ? 'active' : ''}`} onClick={() => setHeatmapRange(9)}>9 Months</Button>
              <Button compact className={`tabBtn ${heatmapRange === 12 ? 'active' : ''}`} onClick={() => setHeatmapRange(12)}>12 Months</Button>
            </div>

            <span className="legendText">
              Workload: 
              <span className="legendBox level-0"></span> 0h
              <span className="legendBox level-1"></span> 0.1-2h
              <span className="legendBox level-2"></span> 2.1-4h
              <span className="legendBox level-3"></span> 4.1h+
            </span>
          </div>
        </div>
        
        <Divider className="panelDivider" />
 
        {heatmapRange === '4weeks' ? (
          <div className="heatmapGridContainer cols-28">
            {heatmapDays.map((date) => {
              const data = getHeatmapDayData(date)
              const hourLevel = data.hours === 0 ? 'level-0' : data.hours <= 2 ? 'level-1' : data.hours <= 4 ? 'level-2' : 'level-3'
              
              // Build informative hover tooltip details
              const tooltipTitle = `${date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
Workload: ${data.hours.toFixed(1)} hrs
${data.events.length > 0 ? '\nEvents:\n' + data.events.map(e => `• ${e.summary}`).join('\n') : 'No events'}`
   
              const isSelected = selectedDate && selectedDate.toDateString() === date.toDateString()
              return (
                <div 
                  key={date.toDateString()} 
                  className={`heatmapDayCell ${hourLevel} ${isSelected ? 'selected' : ''}`}
                  title={tooltipTitle}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="cellDateNumber">{date.getDate()}</span>
                  <span className="cellDayName">{date.toLocaleDateString(undefined, { weekday: 'narrow' })}</span>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="monthlyCardsContainer">
            {getMonthCalendars.map((monthCal) => {
              return (
                <div key={monthCal.title} className="monthCard">
                  <Header as="h4" className="monthCardTitle" style={{ color: '#fff', marginBottom: '0.75rem', textAlign: 'center' }}>
                    {monthCal.title}
                  </Header>
                  <div className="weekdayHeaderRow">
                    <span>S</span><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span>
                  </div>
                  <div className="monthDaysGrid">
                    {monthCal.dayCells.map((cell) => {
                      if (cell.isSpacer) {
                        return <div key={cell.key} className="dayCellSpacer" />
                      }
                      
                      const isCellActive = cell.isActive
                      if (!isCellActive || !cell.date) {
                        return (
                          <div key={cell.key} className="dayCellDisabled">
                            {cell.dayNumber}
                          </div>
                        )
                      }
                      
                      const data = getHeatmapDayData(cell.date)
                      const hourLevel = data.hours === 0 ? 'level-0' : data.hours <= 2 ? 'level-1' : data.hours <= 4 ? 'level-2' : 'level-3'
                      const isSelected = selectedDate && selectedDate.toDateString() === cell.date.toDateString()
                      
                      const tooltipTitle = `${cell.date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
Workload: ${data.hours.toFixed(1)} hrs
${data.events.length > 0 ? '\nEvents:\n' + data.events.map(e => `• ${e.summary}`).join('\n') : 'No events'}`

                      return (
                        <div
                          key={cell.key}
                          className={`monthDayCell ${hourLevel} ${isSelected ? 'selected' : ''}`}
                          title={tooltipTitle}
                          onClick={() => cell.date && setSelectedDate(cell.date)}
                        >
                          {cell.dayNumber}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
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
          <Loader active inline="centered" size="large" content="Syncing with Google Workspace..." />
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
                    <Button
                      circular
                      icon={showAddMilestoneForm ? 'minus' : 'add'}
                      size="mini"
                      color="blue"
                      basic
                      onClick={() => setShowAddMilestoneForm(!showAddMilestoneForm)}
                      className="sectionAddBtn"
                      title="Add New Milestone"
                      style={{ marginLeft: '1rem' }}
                    />
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

                <div className="searchFilterBar">
                  <Input 
                    icon="search" 
                    placeholder="Search milestones..." 
                    fluid
                    value={taskSearch}
                    onChange={(e) => setTaskSearch(e.target.value)}
                    className="glassInput"
                  />
                </div>

                {showAddMilestoneForm && (
                  <Segment className="glassPanel inlineAddForm" style={{ margin: '1rem 0', background: 'rgba(255, 255, 255, 0.02) !important' }}>
                    <Header as="h4" style={{ color: '#fff', marginBottom: '1rem' }}>Add New Milestone</Header>
                    <div className="formFields" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <Input
                        fluid
                        placeholder="Milestone title..."
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        className="glassInput"
                        required
                      />
                      <Input
                        fluid
                        placeholder="Notes or description (optional)..."
                        value={newMilestoneNotes}
                        onChange={(e) => setNewMilestoneNotes(e.target.value)}
                        className="glassInput"
                      />
                      <div className="formRow" style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                        <Input
                          type="date"
                          value={newMilestoneDue}
                          onChange={(e) => setNewMilestoneDue(e.target.value)}
                          className="glassInput"
                          label="Due Date"
                        />
                        <div className="formActions" style={{ marginLeft: 'auto', display: 'flex', gap: '0.5rem' }}>
                          <Button
                            color="blue"
                            size="small"
                            onClick={handleAddMilestone}
                            loading={addingMilestone}
                            disabled={!newMilestoneTitle.trim()}
                          >
                            Create
                          </Button>
                          <Button
                            basic
                            color="grey"
                            size="small"
                            onClick={() => {
                              setShowAddMilestoneForm(false)
                              setNewMilestoneTitle('')
                              setNewMilestoneNotes('')
                              setNewMilestoneDue('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Segment>
                )}

                <Divider className="panelDivider" />

                {filteredTasks.length === 0 ? (
                  <div className="emptyState">
                    <Icon name="check circle outline" size="huge" className="emptyIcon" />
                    <p className="emptyText">
                      {taskSearch ? 'No milestones match your search.' : `No ${activeTab} tasks found in your list.`}
                    </p>
                  </div>
                ) : (
                  <List divided relaxed className="itemList scrollableList">
                    {filteredTasks.map((task) => {
                      const isToggling = togglingTaskId === task.id
                      return (
                        <List.Item key={task.id} className={`taskItemCard ${task.status === 'completed' ? 'taskCompletedCard' : ''}`}>
                          <List.Content className="taskCardContent">
                            <div className="taskCheckContainer">
                              <Icon 
                                name={task.status === 'completed' ? 'check circle' : 'circle outline'} 
                                size="large" 
                                className={`taskInteractiveCheckbox ${task.status === 'completed' ? 'checked' : ''} ${isToggling ? 'loading' : ''}`}
                                onClick={() => !isToggling && handleToggleTask(task)}
                              />
                            </div>
                            <div className="taskDetailsArea">
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
                              </div>
                            </div>
                          </List.Content>
                        </List.Item>
                      )
                    })}
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
                    <Button
                      circular
                      icon={showAddEventForm ? 'minus' : 'add'}
                      size="mini"
                      color="purple"
                      basic
                      onClick={() => setShowAddEventForm(!showAddEventForm)}
                      className="sectionAddBtn"
                      title="Add New Event"
                      style={{ marginLeft: '1rem' }}
                    />
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

                <div className="searchFilterBar calendarFilterRow">
                  <Input 
                    icon="search" 
                    placeholder="Search events..." 
                    value={calendarSearch}
                    onChange={(e) => setCalendarSearch(e.target.value)}
                    className="glassInput calendarSearchInput"
                  />
                  <div className="timeFilterGroup">
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <Button compact className={`tabBtn ${calendarTimeFilter === 'all' ? 'active' : ''}`} onClick={() => setCalendarTimeFilter('all')}>All</Button>
                      <Button compact className={`tabBtn ${calendarTimeFilter === 'today' ? 'active' : ''}`} onClick={() => setCalendarTimeFilter('today')}>Today</Button>
                      <Button compact className={`tabBtn ${calendarTimeFilter === 'week' ? 'active' : ''}`} onClick={() => setCalendarTimeFilter('week')}>Week</Button>
                      <Button compact className={`tabBtn ${calendarTimeFilter === '2weeks' ? 'active' : ''}`} onClick={() => setCalendarTimeFilter('2weeks')}>14 Days</Button>
                    </div>
                  </div>
                </div>

                {showAddEventForm && (
                  <Segment className="glassPanel inlineAddForm eventAddForm" style={{ margin: '1rem 0', background: 'rgba(255, 255, 255, 0.02) !important' }}>
                    <Header as="h4" style={{ color: '#fff', marginBottom: '1rem' }}>Add New Event</Header>
                    <div className="formFields" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <Input
                        fluid
                        placeholder="Event summary/title..."
                        value={newEventSummary}
                        onChange={(e) => setNewEventSummary(e.target.value)}
                        className="glassInput"
                        required
                      />
                      <Input
                        fluid
                        placeholder="Description (optional)..."
                        value={newEventDescription}
                        onChange={(e) => setNewEventDescription(e.target.value)}
                        className="glassInput"
                      />
                      <div className="timeFieldRow" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Input
                          type="datetime-local"
                          value={newEventStart}
                          onChange={(e) => setNewEventStart(e.target.value)}
                          className="glassInput"
                          label="Start"
                        />
                        <Input
                          type="datetime-local"
                          value={newEventEnd}
                          onChange={(e) => setNewEventEnd(e.target.value)}
                          className="glassInput"
                          label="End"
                        />
                      </div>
                      <div className="formActions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                        <Button
                          color="purple"
                          size="small"
                          onClick={handleAddEvent}
                          loading={addingEvent}
                          disabled={!newEventSummary.trim() || !newEventStart || !newEventEnd}
                        >
                          Create
                        </Button>
                        <Button
                          basic
                          color="grey"
                          size="small"
                          onClick={() => {
                            setShowAddEventForm(false)
                            setNewEventSummary('')
                            setNewEventStart('')
                            setNewEventEnd('')
                            setNewEventDescription('')
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </Segment>
                )}

                <Divider className="panelDivider" />

                {filteredCalendarEvents.length === 0 ? (
                  <div className="emptyState">
                    <Icon name="calendar outline" size="huge" className="emptyIcon" />
                    <p className="emptyText">
                      {calendarSearch 
                        ? 'No events match your search.' 
                        : activeCalendarTab === 'buffers' 
                          ? 'No upcoming prep buffers or milestones scheduled.' 
                          : 'No upcoming calendar events scheduled.'}
                    </p>
                  </div>
                ) : (
                  <List divided relaxed className="itemList scrollableList">
                    {filteredCalendarEvents.map((event) => {
                      const isBuffer = event.summary.toLowerCase().includes('prep') || 
                                       event.summary.toLowerCase().includes('buffer') || 
                                       event.summary.toLowerCase().includes('milestone');
                      
                      // Format Google Web Calendar event edit link
                      const calendarLink = `https://calendar.google.com/calendar/r/eventedit/${event.id}`

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
                                as="a"
                                href={calendarLink}
                                target="_blank"
                                rel="noreferrer"
                                icon="external alternate"
                                color="blue"
                                basic
                                size="mini"
                                title="Open in Google Calendar"
                                disabled={deletingId !== null}
                                className="actionBtn editBtn"
                              />
                              <Button 
                                icon="trash" 
                                color="red" 
                                basic 
                                size="mini" 
                                title="Delete Event"
                                loading={deletingId === event.id}
                                disabled={deletingId !== null}
                                onClick={() => handleDeleteEvent(event.id)}
                                className="actionBtn deleteBtn"
                              />
                            </div>
                          </div>
                        </List.Item>
                      )
                    })}
                  </List>
                )}
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}

      {/* 4. Day Details Sliding Drawer */}
      <div 
        className={`drawerOverlay ${selectedDate ? 'open' : ''}`} 
        onClick={() => setSelectedDate(null)} 
      />
      <div className={`dayDrawer ${selectedDate ? 'open' : ''}`}>
        {selectedDate && (() => {
          const { events: dayEvents, tasks: dayTasks, totalHours } = getDayDetails(selectedDate)
          const formattedDate = selectedDate.toLocaleDateString(undefined, {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })

          return (
            <>
              <div className="drawerHeader">
                <div className="headerMain">
                  <Header as="h3" className="drawerTitle">Day Schedule</Header>
                  <Button 
                    icon="close" 
                    circular 
                    basic 
                    onClick={() => setSelectedDate(null)} 
                    className="drawerCloseBtn"
                  />
                </div>
                <div className="drawerDate">{formattedDate}</div>
                <div className="drawerMetrics">
                  <Label color="blue" basic>
                    <Icon name="clock outline" />
                    {totalHours.toFixed(1)} hrs workload
                  </Label>
                  {dayTasks.length > 0 && (
                    <Label color="violet" basic>
                      <Icon name="tasks" />
                      {dayTasks.filter(t => t.status === 'needsAction').length} pending milestones
                    </Label>
                  )}
                </div>
              </div>

              <Divider className="panelDivider" />

              <div className="drawerContent scrollableList">
                {/* SECTION 1: Tasks / Milestones */}
                <div className="drawerSection">
                  <div className="sectionTitleRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Header as="h4" className="sectionTitle" style={{ margin: 0 }}>
                      <Icon name="tasks" />
                      Milestones due
                    </Header>
                    <Button
                      circular
                      icon={showAddMilestoneForm ? 'minus' : 'add'}
                      size="mini"
                      color="blue"
                      basic
                      onClick={() => {
                        setShowAddMilestoneForm(!showAddMilestoneForm)
                        if (selectedDate) {
                          const localIsoDate = new Date(selectedDate.getTime() - selectedDate.getTimezoneOffset() * 60000).toISOString().split('T')[0]
                          setNewMilestoneDue(localIsoDate)
                        }
                      }}
                      title="Add Milestone due today"
                    />
                  </div>

                  {showAddMilestoneForm && (
                    <Segment className="glassPanel inlineAddForm" style={{ margin: '0 0 1.25rem 0', background: 'rgba(255, 255, 255, 0.02) !important', border: '1px solid rgba(255, 255, 255, 0.08) !important', padding: '1rem !important' }}>
                      <div className="formFields" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Input
                          fluid
                          placeholder="Milestone title..."
                          value={newMilestoneTitle}
                          onChange={(e) => setNewMilestoneTitle(e.target.value)}
                          className="glassInput"
                          required
                        />
                        <Input
                          fluid
                          placeholder="Notes or description (optional)..."
                          value={newMilestoneNotes}
                          onChange={(e) => setNewMilestoneNotes(e.target.value)}
                          className="glassInput"
                        />
                        <div className="formRow" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <Button
                            color="blue"
                            size="small"
                            onClick={handleAddMilestone}
                            loading={addingMilestone}
                            disabled={!newMilestoneTitle.trim()}
                          >
                            Create
                          </Button>
                          <Button
                            basic
                            color="grey"
                            size="small"
                            onClick={() => {
                              setShowAddMilestoneForm(false)
                              setNewMilestoneTitle('')
                              setNewMilestoneNotes('')
                              setNewMilestoneDue('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Segment>
                  )}

                  {dayTasks.length === 0 ? (
                    <p className="noDataText">No milestones due on this day.</p>
                  ) : (
                    <List divided relaxed className="itemList">
                      {dayTasks.map(task => {
                        const isToggling = togglingTaskId === task.id
                        return (
                          <List.Item key={task.id} className={`taskItemCard ${task.status === 'completed' ? 'taskCompletedCard' : ''}`}>
                            <List.Content className="taskCardContent">
                              <div className="taskCheckContainer">
                                <Icon 
                                  name={task.status === 'completed' ? 'check circle' : 'circle outline'} 
                                  size="large" 
                                  className={`taskInteractiveCheckbox ${task.status === 'completed' ? 'checked' : ''} ${isToggling ? 'loading' : ''}`}
                                  onClick={() => !isToggling && handleToggleTask(task)}
                                />
                              </div>
                              <div className="taskDetailsArea">
                                <span className={`taskTitle ${task.status === 'completed' ? 'strikeThrough' : ''}`}>
                                  {task.title || 'Untitled Task'}
                                </span>
                                {task.notes && <p className="taskNotes">{task.notes}</p>}
                              </div>
                            </List.Content>
                          </List.Item>
                        )
                      })}
                    </List>
                  )}
                </div>

                {/* SECTION 2: Calendar Events */}
                <div className="drawerSection" style={{ marginTop: '2rem' }}>
                  <div className="sectionTitleRow" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <Header as="h4" className="sectionTitle" style={{ margin: 0 }}>
                      <Icon name="calendar alternate outline" />
                      Calendar Events
                    </Header>
                    <Button
                      circular
                      icon={showAddEventForm ? 'minus' : 'add'}
                      size="mini"
                      color="purple"
                      basic
                      onClick={() => {
                        setShowAddEventForm(!showAddEventForm)
                        if (selectedDate) {
                          const localStart = new Date(selectedDate)
                          localStart.setHours(9, 0, 0, 0)
                          const localEnd = new Date(selectedDate)
                          localEnd.setHours(10, 0, 0, 0)
                          
                          const localStartIso = new Date(localStart.getTime() - localStart.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                          const localEndIso = new Date(localEnd.getTime() - localEnd.getTimezoneOffset() * 60000).toISOString().slice(0, 16)
                          
                          setNewEventStart(localStartIso)
                          setNewEventEnd(localEndIso)
                        }
                      }}
                      title="Add Event on this day"
                    />
                  </div>

                  {showAddEventForm && (
                    <Segment className="glassPanel inlineAddForm eventAddForm" style={{ margin: '0 0 1.25rem 0', background: 'rgba(255, 255, 255, 0.02) !important', border: '1px solid rgba(255, 255, 255, 0.08) !important', padding: '1rem !important' }}>
                      <div className="formFields" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <Input
                          fluid
                          placeholder="Event summary/title..."
                          value={newEventSummary}
                          onChange={(e) => setNewEventSummary(e.target.value)}
                          className="glassInput"
                          required
                        />
                        <Input
                          fluid
                          placeholder="Description (optional)..."
                          value={newEventDescription}
                          onChange={(e) => setNewEventDescription(e.target.value)}
                          className="glassInput"
                        />
                        <div className="timeFieldRow" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <Input
                            type="datetime-local"
                            value={newEventStart}
                            onChange={(e) => setNewEventStart(e.target.value)}
                            className="glassInput"
                            label="Start"
                            size="mini"
                          />
                          <Input
                            type="datetime-local"
                            value={newEventEnd}
                            onChange={(e) => setNewEventEnd(e.target.value)}
                            className="glassInput"
                            label="End"
                            size="mini"
                          />
                        </div>
                        <div className="formActions" style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.25rem' }}>
                          <Button
                            color="purple"
                            size="small"
                            onClick={handleAddEvent}
                            loading={addingEvent}
                            disabled={!newEventSummary.trim() || !newEventStart || !newEventEnd}
                          >
                            Create
                          </Button>
                          <Button
                            basic
                            color="grey"
                            size="small"
                            onClick={() => {
                              setShowAddEventForm(false)
                              setNewEventSummary('')
                              setNewEventStart('')
                              setNewEventEnd('')
                              setNewEventDescription('')
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </Segment>
                  )}
                  {dayEvents.length === 0 ? (
                    <p className="noDataText">No events scheduled on this day.</p>
                  ) : (
                    <List divided relaxed className="itemList">
                      {dayEvents.map(event => {
                        const isBuffer = event.summary.toLowerCase().includes('prep') || 
                                         event.summary.toLowerCase().includes('buffer') || 
                                         event.summary.toLowerCase().includes('milestone')
                        const calendarLink = `https://calendar.google.com/calendar/r/eventedit/${event.id}`

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
                                {event.description && <p className="eventDescription">{event.description}</p>}
                              </div>
                              <div className="eventItemActions">
                                <Button 
                                  as="a"
                                  href={calendarLink}
                                  target="_blank"
                                  rel="noreferrer"
                                  icon="external alternate"
                                  color="blue"
                                  basic
                                  size="mini"
                                  title="Open in Google Calendar"
                                  disabled={deletingId !== null}
                                  className="actionBtn editBtn"
                                />
                                <Button 
                                  icon="trash" 
                                  color="red" 
                                  basic 
                                  size="mini" 
                                  title="Delete Event"
                                  loading={deletingId === event.id}
                                  disabled={deletingId !== null}
                                  onClick={() => handleDeleteEvent(event.id)}
                                  className="actionBtn deleteBtn"
                                />
                              </div>
                            </div>
                          </List.Item>
                        )
                      })}
                    </List>
                  )}
                </div>
              </div>
            </>
          )
        })()}
      </div>
    </Container>
  )
}
