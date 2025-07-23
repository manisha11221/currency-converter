import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}))

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