const connection = require("../config/connection");
const { User, Transaction, Party } = require("../models");


connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing transaction
  await Transaction.deleteMany({});

  // Drop existing transaction
  await Party.deleteMany({});

  // Insert users

  const user1 = await User.create({
    "_id": "637e5c0785ae7bff97f75fb3",
    "username": "Tarek",
    "email": "test@gmail.com",
    "password": "test123",
    "balance": 1000
  });

  const user2 = await User.create({
    "_id": "637e5c38797f0bd7a8674538",
    "username": "Jon",
    "email": "test2@gmail.com",
    "password": "test123",
    "balance": 1000
  });

  // Pay button has been clicked
  const party1 = await Party.create({
    "_id": "637e5c67376d07d732253472",
    "sendingUser": "637e5c38797f0bd7a8674538",
    "recievingUser": "637e5c0785ae7bff97f75fb3"
  })

  // Insert transaction
  const transaction1 = await Transaction.create({
    "transactionText": "Beer",
    "start": "2022-11-23",
    "amount": 50,
    "groupId": "credit",
    "party": "637e5c67376d07d732253472",
    "pending": false
  });

  await User.findOneAndUpdate(
    { _id: user1._id },
    {
      $push: { transaction: transaction1._id },
      $inc: { balance: transaction1.amount }
    },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user2._id },
    {
      $push: { transaction: transaction1._id },
      $inc: { balance: -1 * transaction1.amount }
    },
    { new: true }
  )

  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.info("Seeding complete!");
});
