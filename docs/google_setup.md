# Google Workspace Sync Integration Setup

This guide provides step-by-step instructions to configure and manage the Google Cloud Console settings required for the Milestone Dashboard to function correctly.

---

## 1. Google Cloud Project Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Click the project dropdown in the top navigation bar and select **New Project**.
3. Enter a project name (e.g., `personal-site-sync`) and click **Create**.

---

## 2. Enable Required APIs

You must enable both the Calendar and Tasks APIs so that your client can communicate with them.

1. In the sidebar, navigate to **APIs & Services** > **Library**.
2. Search for **Google Tasks API**, click it, and click **Enable**.
3. Return to the Library, search for **Google Calendar API**, click it, and click **Enable**.

---

## 3. Configure OAuth Consent Screen

Since the application uses OAuth 2.0 to access Tasks and Calendar data, you must configure the Consent Screen.

1. Navigate to **APIs & Services** > **OAuth consent screen**.
2. Select **External** User Type (unless you have a Google Workspace organization and want to restrict it to your org, in which case select **Internal**) and click **Create**.
3. Fill in the **App information**:
   - **App name**: e.g., `Personal Milestone Dashboard`
   - **User support email**: Your email address
   - **Developer contact information**: Your email address
4. Click **Save and Continue**.

### Add Scopes
1. In the **Scopes** step, click **Add or Remove Scopes**.
2. Add the following scopes manually or select them from the list:
   - `.../auth/userinfo.email` (to identify your account email)
   - `.../auth/tasks` (to sync and manage Tasks/Milestones)
   - `.../auth/calendar.events` (to manage Calendar Events)
3. Click **Save and Continue**.

### Add Test Users (CRITICAL)
While your OAuth application is in **Testing** mode (the default status before publishing), Google will return **403 Forbidden** errors to any user who is not explicitly listed as a test user.
1. In the **Test users** step, click **Add Users**.
2. Enter your email address (`lucas.gansberg@gmail.com`) and click **Add**.
3. Click **Save and Continue**, then review the summary and click **Back to Dashboard**.

---

## 4. Create OAuth 2.0 Client Credentials

To connect the frontend dashboard to Google, you need to generate a Client ID.

1. Navigate to **APIs & Services** > **Credentials**.
2. Click **Create Credentials** at the top and select **OAuth client ID**.
3. Select **Web application** as the Application type.
4. Name your client (e.g., `Personal Site Dashboard Client`).
5. Configure **Authorized JavaScript origins**:
   - **For Local Testing**: `http://localhost:3000`
   - **For Production**: `https://lucas-gansberg.com` (and `https://bowlwinkle.github.io` if applicable)
6. Configure **Authorized redirect URIs**:
   - Add the same URLs used in the Javascript origins step (`http://localhost:3000` and `https://lucas-gansberg.com`).
7. Click **Create**.
8. Copy the generated **Client ID**.

---

## 5. Configure Your Application

### Local Environment Setup
To run the dashboard locally, you must provide your Google Client ID via environment variables.

1. Create a `.env.local` file at the root of the project:
   ```bash
   REACT_APP_GOOGLE_CLIENT_ID="YOUR_COPIED_CLIENT_ID"
   ```
2. Run `yarn start` to test the application locally.

### Production Environment Setup
1. Go to your GitHub repository settings.
2. Navigate to **Settings** > **Secrets and variables** > **Actions**.
3. Click **New repository secret**.
4. Name the secret `REACT_APP_GOOGLE_CLIENT_ID`.
5. Paste your production Client ID as the value and click **Add secret**.
6. When the GitHub Actions deployment workflow runs, it will inject this value into the build.
