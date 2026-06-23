// Types representing the structures returned by Google APIs
export interface GoogleProfile {
  email: string;
  name: string;
  picture: string;
}

export interface TaskItem {
  id: string;
  title: string;
  notes?: string;
  status: 'needsAction' | 'completed';
  updated: string;
  due?: string;
  listId?: string;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: { date?: string; dateTime?: string };
  end: { date?: string; dateTime?: string };
  description?: string;
}

export interface AuthState {
  token: string | null;
  profile: GoogleProfile | null;
  error: string | null;
  isAuthenticated: boolean;
  isValidating: boolean;
}


// Whitelist Configuration
const ALLOWED_OWNER_EMAIL = 'lucas.gansberg@gmail.com';
const STORAGE_KEY_TOKEN = 'ag_sync_oauth_token';
const STORAGE_KEY_PROFILE = 'ag_sync_user_profile';

// Scopes required for pulling tasks, calendar events, and identifying the user (read-write for events/tasks)
const REQUESTED_SCOPES = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/tasks',
  'https://www.googleapis.com/auth/calendar.events'
].join(' ');


export class WorkspaceSyncEngine {
  private clientId: string;
  private authState: AuthState = {
    token: null,
    profile: null,
    error: null,
    isAuthenticated: false,
    isValidating: false
  };

  private onStateChangeCallback?: (state: AuthState) => void;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.loadPersistedSession();
  }

  /**
   * Registers a callback listener to notify the SPA UI of state changes (e.g., loading, auth, errors)
   */
  public onStateChange(callback: (state: AuthState) => void): void {
    this.onStateChangeCallback = callback;
    // Initial emission
    callback({ ...this.authState });
  }

  private updateState(updated: Partial<AuthState>): void {
    this.authState = { ...this.authState, ...updated };
    if (this.onStateChangeCallback) {
      this.onStateChangeCallback({ ...this.authState });
    }
  }


  /**
   * Checks localStorage for existing sessions to bootstrap performance
   */
  private loadPersistedSession(): void {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);
    const profileJson = localStorage.getItem(STORAGE_KEY_PROFILE);

    if (token && profileJson) {
      try {
        const profile = JSON.parse(profileJson) as GoogleProfile;
        
        // Double check the persistent state hasn't been tampered with
        if (profile.email.toLowerCase() === ALLOWED_OWNER_EMAIL.toLowerCase()) {
          this.authState = {
            token,
            profile,
            error: null,
            isAuthenticated: true,
            isValidating: false
          };
        } else {
          this.logout();
        }
      } catch (e) {
        this.logout();
      }
    }
  }


  /**
   * Triggers the native Google Identity Services Token flow
   */
  public login(): void {
    if (typeof window === 'undefined') return;

    this.updateState({ isValidating: true, error: null });

    try {
      // Ensure the GIS script is loaded
      if (!(window as any).google?.accounts?.oauth2) {
        throw new Error('Google Accounts OAuth2 library is not loaded. Please ensure gsi/client script is in index.html');
      }

      const client = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: this.clientId,
        scope: REQUESTED_SCOPES,
        callback: async (response: any) => {
          if (response.error) {
            this.updateState({ 
              error: `OAuth Error: ${response.error_description || response.error}`, 
              isValidating: false 
            });
            return;
          }

          if (response.access_token) {
            await this.validateAndHydrateUser(response.access_token);
          }
        }
      });

      client.requestAccessToken();
    } catch (error: any) {
      this.updateState({ error: error.message || 'OAuth Initialization Failed', isValidating: false });
    }
  }


  /**
   * Fetches profile metadata and enforces whitelisting before saving tokens or allowing passage
   */
  private async validateAndHydrateUser(token: string): Promise<void> {
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error('Failed to verify profile info from Google.');
      }

      const profile: GoogleProfile = await response.json();

      // STRICT SECURITY BOUNDARY:
      // We block any profile whose email does not match the hardcoded owner whitelist
      if (profile.email.toLowerCase() !== ALLOWED_OWNER_EMAIL.toLowerCase()) {
        throw new Error(`Unauthorized. This dashboard belongs exclusively to ${ALLOWED_OWNER_EMAIL}. Access has been denied.`);
      }

      // If validation succeeds, commit session details to browser storage
      localStorage.setItem(STORAGE_KEY_TOKEN, token);
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(profile));

      this.updateState({
        token,
        profile,
        error: null,
        isAuthenticated: true,
        isValidating: false
      });
    } catch (err: any) {
      // Clear out anything saved to protect states
      this.logout();
      this.updateState({
        error: err.message || 'Authentication validation failed',
        isValidating: false
      });
    }
  }


  /**
   * Fetches the user's active milestones from Google Tasks
   */
  public async fetchTasks(): Promise<TaskItem[]> {
    if (!this.authState.isAuthenticated || !this.authState.token) {
      throw new Error('Unauthenticated API call attempt.');
    }

    try {
      // 1. Fetch Task lists to locate our targeted 'Master Milestones' board
      const listsResponse = await fetch('https://www.googleapis.com/tasks/v1/users/@me/lists', {
        headers: { Authorization: `Bearer ${this.authState.token}` }
      });

      if (!listsResponse.ok) throw new Error('Failed to retrieve Google Task lists');
      const listData = await listsResponse.json();
      
      const targetList = listData.items?.find((list: any) => 
        list.title.toLowerCase() === 'master milestones'
      );

      if (!targetList) {
        // Fallback to primary if the custom milestones list isn't found
        return await this.fetchTasksFromList('@default');
      }

      return await this.fetchTasksFromList(targetList.id);
    } catch (error: any) {
      console.error('WorkspaceSyncEngine: error fetching Tasks', error);
      throw error;
    }
  }

  private async fetchTasksFromList(listId: string): Promise<TaskItem[]> {
    const response = await fetch(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=true&showHidden=true`, {
      headers: { Authorization: `Bearer ${this.authState.token}` }
    });

    if (!response.ok) throw new Error('Failed to download Tasks from the target list');
    const data = await response.json();
    
    return (data.items || []).map((t: any) => ({
      id: t.id,
      title: t.title,
      notes: t.notes,
      status: t.status,
      updated: t.updated,
      due: t.due,
      listId: listId
    }));
  }


  /**
   * Retrieves events from primary calendar, targeting upcoming milestones and travel buffers
   */
  public async fetchUpcomingEvents(maxResults = 30): Promise<CalendarEvent[]> {
    if (!this.authState.isAuthenticated || !this.authState.token) {
      throw new Error('Unauthenticated API call attempt.');
    }

    try {
      const nowIso = new Date().toISOString();
      const url = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${nowIso}&singleEvents=true&orderBy=startTime&maxResults=${maxResults}`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${this.authState.token}` }
      });

      if (!response.ok) throw new Error('Failed to retrieve Google Calendar events');
      const data = await response.json();

      return (data.items || []).map((e: any) => ({
        id: e.id,
        summary: e.summary || 'Untitled Event',
        start: e.start,
        end: e.end,
        description: e.description
      }));
    } catch (error: any) {
      console.error('WorkspaceSyncEngine: error fetching Calendar', error);
      throw error;
    }
  }


  /**
   * Updates a task status directly on Google Tasks
   */
  public async updateTaskStatus(listId: string, taskId: string, completed: boolean): Promise<void> {
    if (!this.authState.isAuthenticated || !this.authState.token) {
      throw new Error('Unauthenticated API call attempt.');
    }

    const response = await fetch(`https://www.googleapis.com/tasks/v1/lists/${listId}/tasks/${taskId}`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${this.authState.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: completed ? 'completed' : 'needsAction'
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to update task status: ${errText || response.statusText}`);
    }
  }


  /**
   * Deletes a specific calendar event by ID
   */
  public async deleteCalendarEvent(eventId: string): Promise<void> {
    if (!this.authState.isAuthenticated || !this.authState.token) {
      throw new Error('Unauthenticated API call attempt.');
    }

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${this.authState.token}` }
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to delete calendar event: ${errText || response.statusText}`);
    }
  }


  /**
   * Terminate active tokens, remove session footprint from storage, and notify observers
   */
  public logout(): void {
    localStorage.removeItem(STORAGE_KEY_TOKEN);
    localStorage.removeItem(STORAGE_KEY_PROFILE);

    this.updateState({
      token: null,
      profile: null,
      error: null,
      isAuthenticated: false,
      isValidating: false
    });
  }
}
