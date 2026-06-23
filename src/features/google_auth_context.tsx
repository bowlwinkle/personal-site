import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { WorkspaceSyncEngine, AuthState, TaskItem, CalendarEvent } from './google_workspace_sync'
import { config } from '../config'

interface GoogleAuthContextType {
  authState: AuthState
  login: () => void
  logout: () => void
  fetchTasks: () => Promise<TaskItem[]>
  fetchUpcomingEvents: (maxResults?: number) => Promise<CalendarEvent[]>
  deleteCalendarEvent: (eventId: string) => Promise<void>
}

const GoogleAuthContext = createContext<GoogleAuthContextType | undefined>(undefined)

export const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
  // Instantiate the sync engine once
  const [engine] = useState(() => new WorkspaceSyncEngine(config.googleClientId))
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    profile: null,
    error: null,
    isAuthenticated: false,
    isValidating: false,
  })

  useEffect(() => {
    // Subscribe to updates from the sync engine
    engine.onStateChange((state) => {
      setAuthState(state)
    })
  }, [engine])

  const login = () => engine.login()
  const logout = () => engine.logout()
  const fetchTasks = () => engine.fetchTasks()
  const fetchUpcomingEvents = (maxResults?: number) => engine.fetchUpcomingEvents(maxResults)
  const deleteCalendarEvent = (eventId: string) => engine.deleteCalendarEvent(eventId)

  return (
    <GoogleAuthContext.Provider
      value={{
        authState,
        login,
        logout,
        fetchTasks,
        fetchUpcomingEvents,
        deleteCalendarEvent,
      }}
    >
      {children}
    </GoogleAuthContext.Provider>
  )
}

export const useGoogleAuth = (): GoogleAuthContextType => {
  const context = useContext(GoogleAuthContext)
  if (context === undefined) {
    throw new Error('useGoogleAuth must be used within a GoogleAuthProvider')
  }
  return context
}
