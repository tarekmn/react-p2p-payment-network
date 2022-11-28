const connection = require("../config/connection");
const { User, Transaction } = require("../models");


connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing transaction
  await Transaction.deleteMany({});

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
  })

  const user3 = await User.create({
    "_id": "6385142f3941552c03082aef",
    "username": "Emma",
    "email": "test3@gmail.com",
    "password": "test123",
    "balance": 1000
  })

  // Insert transaction
  const transaction1 = await Transaction.create({
    "transactionText": "Beer",
    "amount": 50,
    "type": "credit",
    "sendingUser": "637e5c38797f0bd7a8674538",
    "recievingUser": '637e5c0785ae7bff97f75fb3',
    "pending": false
  });

  const transaction2 = await Transaction.create({
    "transactionText": "Rent",
    "amount": 600,
    "type": "credit",
    "sendingUser": "6385142f3941552c03082aef",
    "recievingUser": '637e5c38797f0bd7a8674538',
    "pending": false
  });

  await User.findOneAndUpdate(
    { _id: user1._id },
    {
      $push: { transaction: transaction1._id },
      $inc: { balance: + transaction1.amount }
    },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user2._id },
    {
      $push: { transaction: transaction1._id },
      $inc: { balance: - transaction1.amount }
    },
    { new: true }

  )

  await User.findOneAndUpdate(
    { _id: user2._id },
    {
      $push: { transaction: transaction2._id },
      $inc: { balance: + transaction2.amount }
    },
    { new: true }
  )

  await User.findOneAndUpdate(
    { _id: user3._id },
    {
      $push: { transaction: transaction2._id },
      $inc: { balance: - transaction2.amount }
    },
    { new: true }
  )





  // Log out the seed data to indicate what should appear in the database
  console.table(User)
  console.info("Seeding complete!")
  process.exit()
})
