import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SermonProvider } from './context/SermonContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SermonProvider>
        <App />
      </SermonProvider>
    </BrowserRouter>
  </StrictMode>,
)
