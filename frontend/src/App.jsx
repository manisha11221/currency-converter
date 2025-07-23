
import { Routes, Route } from "react-router-dom"
import Login from "./components/auth/Login"
import "./App.css"
import Register from "./components/auth/Register"
import CurrencyConverter from "./components/CurrencyConverter"
import PrivateRoute from "./utils/PrivateRoute"
import Logout from "./utils/Logout"


const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
         <Route
        path="/"
        element={
          <PrivateRoute>
            <CurrencyConverter />
          </PrivateRoute>
        }
      />
     <Route path="/logout" element={<Logout />} />
    </Routes>
  )
}

export default App
