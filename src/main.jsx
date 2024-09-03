import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import BankState from './context/BankState.jsx'
createRoot(document.getElementById('root')).render(
  <BankState>
    <App />
  </BankState>,
)
