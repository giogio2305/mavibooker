import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom"
import { IconoirProvider, Check } from 'iconoir-react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Router>
      <IconoirProvider>
      <App />
    </IconoirProvider>
    </Router>
  </React.StrictMode>
,
)
