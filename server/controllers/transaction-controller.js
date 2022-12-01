// ObjectId() method for converting transactionID string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Transaction } = require("../models");

require("dotenv").config()

module.exports = {

  // get all transactions
  async getAllTransactions(req, res) {
    try {
      const data = await Transaction.find({}).populate("creditUser").populate("debitUser")

      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  // get current user transactions
  async getTransactions(req, res) {
    try {
      const debit = await Transaction.find({ debitUser: req.params.userId }).populate("creditUser").populate("debitUser")
      const credit = await Transaction.find({ creditUser: req.params.userId }).populate("creditUser").populate("debitUser")
      const data = debit.concat(credit)
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async createTransaction(req, res) {
    console.log('hit')
    try {
      const transaction = await Transaction.create(req.body)

      // add transaction id to users
      const creditor = await User.findByIdAndUpdate(req.body.creditUser, {
        $push: { transactions: transaction._id },
        $inc: { balance: + transaction.amount }
      })
      const debitor = await User.findByIdAndUpdate(req.body.debitUser, {
        $push: { transactions: transaction._id },
        $inc: { balance: (-1 * transaction.amount) }
      })

      res.status(200).json({ creditor, debitor })
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }

  },

  async updateTransaction(req, res) {
    try {
      const data = await Transaction.findOneAndUpdate(
        { _id: req.params.transactionID },
        { $set: req.body })
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async deleteTransaction(req, res) {
    try {
      const data = await Transaction.findOneAndRemove(
        { _id: req.params.transactionID })

      if (!data) {
        return res.status(404).json({ message: 'No such transaction exists' })
      }

      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  }

}

