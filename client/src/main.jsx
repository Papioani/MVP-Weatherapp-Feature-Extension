import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

/* Wrapping the app or components in <React.StrictMode> does not provide routing functionality as BrowserRouter does. 
It helps catch and highlight certain types of bugs or issues to improve the quality of your application. */