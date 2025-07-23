// pages/Register.jsx
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { URI } from "../../const"

const Register = () => {
  const [form, setForm] = useState({ email: "", username: "", password: "" })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    try {
      const res = await axios.post(`${URI}/api/v1/users/register`, form, {
        withCredentials: true,
      })

      if (res?.data?.success) {
        toast.success("Registration successful! Please login.")
        navigate("/login")
      }
    } catch (err) {
      console.error("Registration error:", err)
      const msg = err?.response?.data?.message || "Registration failed"
      setError(msg)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Register</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center text-gray-500 dark:text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 dark:text-blue-400 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  )
}

export default Register
