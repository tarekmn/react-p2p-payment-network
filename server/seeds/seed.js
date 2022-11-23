const connection = require("../config/connection");
const { User, Transaction, Wildcard } = require("../models");


connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing users
  await User.deleteMany({});

  // Drop existing transaction
  await Transaction.deleteMany({});

  // Drop existing transaction
  await Wildcard.deleteMany({});

  // Insert users

  const user1 = await User.create({
    "username": "Tarek",
    "email": "test@gmail.com",
    "password": "test123",
  });

  const user2 = await User.create({
    "username": "Jon",
    "email": "test2@gmail.com",
    "password": "test123",
  });

  // Insert transaction
  const transaction1 = await Transaction.create({
    "transactionText": "Hello these are my transaction",
    "username": user1,
  });

  const transaction2 = await Transaction.create({
    "transactionText": "This is the second transaction",
    "username": user2,
  });

  await User.findOneAndUpdate(
    { _id: user1._id },
    { $push: { transaction: transaction1._id }, },
    { new: true }
  )




  const wildcard1 = await Wildcard.create({
    "textBody": "This is my reaction",
    "transactionId": user2,
  });

  await Transaction.findOneAndUpdate(
    { _id: transaction1._id },
    { $push: { wildcard: wildcard1._id }, },
    { new: true }
  )


  // Log out the seed data to indicate what should appear in the database
  console.table(User);
  console.info("Seeding complete!");
});
