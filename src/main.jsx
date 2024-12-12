import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Context.jsx';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
