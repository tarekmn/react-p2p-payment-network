const { Schema, model, Types } = require("mongoose");
const bcrypt = require("bcrypt");

let randNum = Math.floor(Math.random() * 14)
console.log(randNum)

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
      default: `stock${randNum}`
    },
    transactions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    ],
    balance: { type: Number, required: true, default: 1000 },
    contacts: [{ type: Schema.Types.ObjectId, ref: 'Contact' }]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this._doc.password, 10)
  next();
});



const User = model("User", userSchema);

module.exports = User;
