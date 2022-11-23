const { Schema, model, Types } = require("mongoose");


//creating transactionSchema
const transactionSchema = new Schema(
  {
    transactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    username: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);



const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;
