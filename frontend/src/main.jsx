import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Or './App.css' depending on your file
// FIX: Import BrowserRouter
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* FIX: This wrapper was missing! It provides the 'Router Context' */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)