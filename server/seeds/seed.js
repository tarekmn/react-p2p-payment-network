const connection = require("../config/connection")
const { User, Transaction, Contact } = require("../models")

connection.on("error", (err) => err)

connection.once("open", async () => {
  console.log("connected")

  await User.deleteMany({})
  await Transaction.deleteMany({})
  await Contact.deleteMany({})

  // Sign up two new users

  const testOne = await User.create({
    "_id": "637e5c0785ae7bff97f75fb3",
    "username": "Test One",
    "email": "test1@gmail.com",
    "password": "password",
    "image": "stock4",
    "balance": 1000,
    "contacts": ["63878c6870635eb00e49e284"],
    "transactions": [
      "63878c53c9a645f3681a76a7",
      "63878ccc226baf2983426be5"
    ]
  })

  const testTwo = await User.create({
    "_id": "6385142f3941552c03082aef",
    "username": "Test Two",
    "email": "test2@gmail.com",
    "password": "password",
    "image": "stock5",
    "balance": 1000,
    "contacts": ["63878c6870635eb00e49e284"],
    "transactions": [
      "63878c53c9a645f3681a76a7",
      "63878ccc226baf2983426be5"
    ]
  })

  // Gary added Katy as a contact
  const contact = await Contact.create({
    "_id": "63878c6870635eb00e49e284",
    "sendingUser": "637e5c0785ae7bff97f75fb3",
    "recievingUser": "6385142f3941552c03082aef",
    "pending": false
  })

  // Gary sent Katy money, and she accepted
  const transaction1 = await Transaction.create({
    "_id": "63878c53c9a645f3681a76a7",
    "transactionText": "Happy Thanksgiving",
    "amount": 50,
    "type": "debit",
    "creditUser": testTwo._id,
    "debitUser": testOne._id
  });

  // Katy sent Gary money, and he accepted
  const transaction2 = await Transaction.create({
    "_id": "63878ccc226baf2983426be5",
    "transactionText": "Merry Christmas",
    "amount": 50,
    "type": "debit",
    "creditUser": testOne._id,
    "debitUser": testTwo._id
  })

  // Log out the seed data to indicate what should appear in the database
  console.table({ testOne })
  console.table({ testTwo })
  console.info("Seeding complete!")
  process.exit()
})