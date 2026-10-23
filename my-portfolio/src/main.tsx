import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Fonts ship with the bundle (latin subsets only) instead of a render-blocking Google Fonts request.
import '@fontsource/unifrakturcook/latin-700.css'
import '@fontsource/saira/latin-600.css'
import '@fontsource/saira/latin-700.css'
import '@fontsource/saira/latin-800.css'
import '@fontsource/saira/latin-800-italic.css'
import '@fontsource/michroma/latin-400.css'
import './game/game.css'
import App from './game/App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
