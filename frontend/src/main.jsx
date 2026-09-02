import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { IconContext } from '@phosphor-icons/react'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <IconContext.Provider
        value={{
          weight: 'duotone',
          size: '1em',
        }}
      >
        <App />
      </IconContext.Provider>
    </BrowserRouter>
  </StrictMode>,
)
