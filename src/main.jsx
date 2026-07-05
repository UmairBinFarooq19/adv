import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
import App from './App'
import './styles/index.css'

// MotionConfig with reducedMotion="user" makes EVERY Framer Motion animation
// respect the OS "reduce motion" setting — the CSS media query alone can't stop
// JS-driven transforms. A single wrapper covers the whole app.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
