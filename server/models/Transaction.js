const { Schema, model, Types } = require("mongoose");

const transactionSchema = new Schema(
  {
    transactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
    amount: { type: Number, required: true },
    creditUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    debitUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    timestamps: true
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
