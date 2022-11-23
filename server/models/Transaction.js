const { Schema, model, Types } = require("mongoose");
const partySchema = require('./Party')

//creating transactionSchema
const transactionSchema = new Schema(
  {
    transactionText: {
      type: String,
      required: true,
      max_length: 280,
    },
    start: {
      type: String,
      default: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
    },
    amount: { type: Number, required: true },
    groupId: { type: String, required: true },
    party: {
      type: Types.ObjectId,
      ref: 'Party',
      required: true
    }
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
