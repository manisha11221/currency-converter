// pages/Login.jsx
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { URI } from "../../const"

const Login = () => {

  const [error, setError] = useState("")
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
       
       
        console.log("Logging in with:", { email, password });
      const res = await axios.post(`${URI}/api/v1/users/login`,{email,password,username:email}, {withCredentials: true})
      const { user, accessToken } = res.data.data
        if(res) {
             localStorage.setItem("token", accessToken)
             localStorage.setItem("user", JSON.stringify(user))
            toast.success("Login successful!")
            navigate("/") 
        }
    } catch (err) {
      const msg = err?.data?.message || "Login failed"
       console.log(err);
       
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Login</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email/username</label>
            <input
              name="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Don’t have an account? <a href="/register" className="text-blue-600 dark:text-blue-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  )
}

export default Login
