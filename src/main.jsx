import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/Context.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { CartToggleProvider } from './context/CartToggleContext.jsx';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { CartToggleContext } from './context/CartToggleContext.jsx';
const theme = createTheme();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartToggleProvider>
      <AuthProvider>
      <CartProvider>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
    </ThemeProvider>
    </CartProvider>
    </AuthProvider>
    </CartToggleProvider>
  </StrictMode>,
)
