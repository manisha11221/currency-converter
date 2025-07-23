import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()
const allowedOrigins = [
  "https://currency-converter-ssse.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//routes import
import userRouter from './routes/userRoutes.js'
import CurrencyTransactionRouter from "./routes/CurrencyTransactionRoutes.js"

//routes declaration

app.use("/api/v1/users", userRouter)
app.use("/api/v1/transiction", CurrencyTransactionRouter)

export { app }
