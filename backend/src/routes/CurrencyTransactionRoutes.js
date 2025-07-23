// routes/currencyTransaction.routes.js
import express from "express"
import { addTransaction, getTransactions } from "../controller/currencyTransactionController.js"
import { verifyJWT } from "../middleware/authMiddleware.js";

const router = express.Router()

router.post("/add", verifyJWT, addTransaction)
router.get("/get", verifyJWT, getTransactions)

export default router
