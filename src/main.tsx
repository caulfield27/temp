import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './app/providers/router/Provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider/>
  </StrictMode>,
)
