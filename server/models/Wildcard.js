const { Schema, model, Types } = require("mongoose");


//creating wildcardSchema
const wildcardSchema = new Schema(
  {

    textBody: {
      type: String,
      required: true,
      max_length: 280,
    },
    transactionId: {
      type: String,
      ref: "Transaction",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Wildcard = model("Wildcard", wildcardSchema);

module.exports = Wildcard;
