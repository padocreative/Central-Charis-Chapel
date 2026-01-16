import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SermonProvider } from './context/SermonContext'
import { AuthProvider } from './context/AuthContext'
import { LiveStreamProvider } from './context/LiveStreamContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SermonProvider>
          <LiveStreamProvider>
            <App />
          </LiveStreamProvider>
        </SermonProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
