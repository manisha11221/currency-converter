
import './index.css'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify'
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
     <ToastContainer />
    <App />
  </BrowserRouter>
)
