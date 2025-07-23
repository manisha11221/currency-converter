
import { CurrencyTransaction } from "../model/currencyTransactionModel.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const addTransaction = asyncHandler(async (req, res) => {
  const { from, to, amount, result } = req.body
  const userId = req.user?._id

  if (!userId || !from || !to || !amount || !result) {
    throw new ApiError(400, "Missing required fields")
  }

  const transaction = await CurrencyTransaction.create({
    userId,
    from: from.toUpperCase(),
    to: to.toUpperCase(),
    amount,
    result
  })

  return res.status(201).json(
    new ApiResponse(201, transaction, "Transaction recorded successfully")
  )
})

const getTransactions = asyncHandler(async (req, res) => {
  const userId = req.user?._id

  if (!userId) {
    throw new ApiError(401, "Unauthorized")
  }

  const transactions = await CurrencyTransaction.find({ userId })
    .sort({ createdAt: -1 }).limit(5)

  return res.status(200).json(
    new ApiResponse(200, transactions, "User transactions fetched successfully")
  )
})

export {
  addTransaction,
  getTransactions,
}
