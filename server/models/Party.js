const { Schema, model, Types } = require("mongoose");


//creating partySchema
const partySchema = new Schema(
  {
    sendingUser: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    recievingUser: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: true,
  }
);

const Party = model("Party", partySchema);

module.exports = Party;
