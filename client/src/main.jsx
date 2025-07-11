import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/AppProvider.jsx';
import { SocketProvider } from './context/SocketContext.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <AppProvider>
        <SocketProvider>
          <App />
        </SocketProvider>
      </AppProvider>
    </StrictMode>
  </BrowserRouter>
)
