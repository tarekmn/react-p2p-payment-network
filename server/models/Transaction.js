const { Schema, model, Types } = require("mongoose");

const transactionSchema = new Schema(
  {
    transactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
    amount: { type: Number, required: true },
    type: { type: String, required: true },
    sendingUser: { type: Types.ObjectId },
    recievingUser: { type: Types.ObjectId },
    pending: { type: Boolean, required: true }
  },
  {
    toJSON: {
      virtuals: true,
    }
  }
)

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
