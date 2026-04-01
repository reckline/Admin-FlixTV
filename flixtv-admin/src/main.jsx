import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthContextProvider } from './context/AuthContext'

// Humne ReactDOM.createRoot ko ek variable mein le liya hai taaki code clean rahe
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

// Dono render logic ko ek hi AuthContextProvider ke andar wrap kar diya hai
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);