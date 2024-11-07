import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BlankSpace from './components/BlankSpace';
import './css/index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlankSpace />
    <App />
  </StrictMode>,
)
