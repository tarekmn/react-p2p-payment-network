const connection = require("../config/connection")
const { User, Transaction, Contact } = require("../models")

connection.on("error", (err) => err)

connection.once("open", async () => {
  console.log("connected")

  await User.deleteMany({})
  await Transaction.deleteMany({})
  await Contact.deleteMany({})

  // Sign up two new users

  const gary = await User.create({
    "_id": "637e5c0785ae7bff97f75fb3",
    "username": "Gary",
    "email": "test@gmail.com",
    "password": "password",
    "image": "stock4",
    "balance": 1000,
    "contacts": ["63878c6870635eb00e49e284"],
    "transactions": [
      "63878c53c9a645f3681a76a7",
      "63878ccc226baf2983426be5"
    ]
  })

  const katy = await User.create({
    "_id": "6385142f3941552c03082aef",
    "username": "Katy",
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
    "creditUser": katy._id,
    "debitUser": gary._id,
    "pending": false
  });

  // Katy sent Gary money, and he accepted
  const transaction2 = await Transaction.create({
    "_id": "63878ccc226baf2983426be5",
    "transactionText": "Merry Christmas",
    "amount": 50,
    "type": "debit",
    "creditUser": gary._id,
    "debitUser": katy._id,
    "pending": false
  })

  // For testing contact function
  const bob = await User.create({
    "_id": "6387a52df286afba049c8212",
    "username": "Bob",
    "email": "test3@gmail.com",
    "password": "password",
    "image": "stock2",
    "balance": 1000
  })

  // Log out the seed data to indicate what should appear in the database
  console.table({ katy, gary, bob })
  console.info("Seeding complete!")
  process.exit()
})
