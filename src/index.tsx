import 'semantic-ui-css/semantic.min.css'

import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import Spinner from './components/spinner'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { ThemeProvider } from './components/theme-provider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider
          router={router}
          fallbackElement={<Spinner />}
          future={{ v7_startTransition: true }}
        />
      </ThemeProvider>
    </Provider>
    <div className="inkOverlay" />
  </StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
