const { Schema, model, Types } = require("mongoose");

const transactionSchema = new Schema(
  {
    transactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
    amount: { type: Number, required: true },
    sendingUser: {
      type: Types.ObjectId,
      ref: "User",
    },
    recievingUser: {
      type: Types.ObjectId,
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
