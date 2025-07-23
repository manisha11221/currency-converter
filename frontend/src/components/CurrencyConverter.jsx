import { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { URI } from '../const'

const API_PRIMARY = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1'
const API_FALLBACK = 'https://latest.currency-api.pages.dev/v1'
const BACKEND_BASE = `${URI}/api/v1/transiction`

export default function CurrencyConverter() {
  const [currencies, setCurrencies] = useState({})
  const [from, setFrom] = useState('usd')
  const [to, setTo] = useState('inr')
  const [amount, setAmount] = useState('')
  const [result, setResult] = useState(null)
  const [history, setHistory] = useState([])

  // Fetch currencies and transactions
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const res = await axios.get(`${API_PRIMARY}/currencies.json`)
        setCurrencies(res.data)
      } catch {
        try {
          const res = await axios.get(`${API_FALLBACK}/currencies.json`)
          setCurrencies(res.data)
        } catch (err) {
          console.error('Failed to fetch currencies', err)
        }
      }
    }

    const fetchHistory = async () => {
      try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${BACKEND_BASE}/get`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      setHistory(res.data.data); 
  } catch (err) {
        console.error("Failed to fetch history from backend", err)
      }
    }

    fetchCurrencies()
    fetchHistory()
  }, [])

  const convertCurrency = async () => {
    if (!amount || isNaN(amount)) return toast.warn('Please enter a valid amount.')

    try {
      const url = `${API_PRIMARY}/currencies/${from}.json`
      const fallbackUrl = `${API_FALLBACK}/currencies/${from}.json`

      let data
      try {
        const res = await axios.get(url)
        data = res.data
      } catch {
        const res = await axios.get(fallbackUrl)
        data = res.data
      }

      const rate = data[from]?.[to]
      if (!rate) return toast.error(`No exchange rate found for ${to.toUpperCase()}`)

      const converted = (amount * rate).toFixed(2)
      setResult(converted)

      const newTransaction = {
        from: from.toUpperCase(),
        to: to.toUpperCase(),
        amount: Number(amount),
        result: Number(converted)
      }

      // Save to backend
      await axios.post(`${BACKEND_BASE}/add`, newTransaction, {withCredentials: true})

      // Update frontend history
      const updated = [newTransaction, ...history].slice(0, 5)
      setHistory(updated)
    } catch (err) {
      console.error('Error converting currency:', err)
      toast.error('Something went wrong while converting. Please try again.')
    }
  }

  return (
    <main className="min-h-screen  text-gray-800 px-4 py-10 dark:bg-gray-900 dark:text-white transition">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-6 sm:p-8 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold">💱 Currency Converter</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium">From</label>
            <select
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
            >
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code}>
                  {code.toUpperCase()} - {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">To</label>
            <select
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
            >
              {Object.entries(currencies).map(([code, name]) => (
                <option key={code} value={code}>
                  {code.toUpperCase()} - {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAmount(value);
                }
                if (result) {
                  setResult(null);
                }
              }}
              placeholder="Enter amount"
              className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>

        <div className="text-center">
          <button
            onClick={convertCurrency}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            Convert
          </button>
        </div>

        {result && (
          <div className="text-center text-lg font-medium text-green-600 dark:text-green-400 wrap-break-word">
            {amount} {from.toUpperCase()} = {result} {to.toUpperCase()}
          </div>
        )}

        <div>
          <h3 className="text-lg font-semibold mb-3">🕘 Recent Transactions</h3>
          {history.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400">No recent transactions.</p>
          ) : (
            <ul className="space-y-2">
              {history.map((item, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    setFrom(item.from.toLowerCase())
                    setTo(item.to.toLowerCase())
                    setAmount(item.amount.toString())
                    setResult(item.result.toFixed(2))
                  }}
                  className="cursor-pointer p-3 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition wrap-break-word"
                >
                  <strong>{item.amount}</strong> {item.from} → <strong>{item.result}</strong>{' '}
                  {item.to} <span className="text-xs">({item.date || 'from DB'})</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <a href='/logout' className="text-sm text-blue-600 dark:text-blue-400 hover:underline">Logout</a>
      </div>
    </main>
  )
}
