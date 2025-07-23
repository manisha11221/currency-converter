import mongoose, {Schema} from "mongoose";

const CurrencyTransactionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    from: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    to: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    result: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true }
);

export const CurrencyTransaction = mongoose.model("CurrencyTransaction", CurrencyTransactionSchema)

