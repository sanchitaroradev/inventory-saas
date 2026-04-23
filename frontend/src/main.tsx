import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

const theme = localStorage.getItem("theme");
const root = document.documentElement;

if (theme === "dark") {
  root.classList.add("dark");
} else {
  root.classList.remove("dark");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)
