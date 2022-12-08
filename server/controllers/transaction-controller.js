// ObjectId() method for converting transactionID string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Transaction } = require("../models");
const { findByIdAndDelete } = require("../models/User");

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
    try {
      let creditor
      let debitor
      const t = await Transaction.create(req.body)
      const transaction = await Transaction.findById(t._id).populate('creditUser').populate('debitUser')
      if (transaction.pending) {
        // user requested money
        creditor = await User.findByIdAndUpdate(req.body.creditUser, {
          $push: { transactions: transaction._id }
        }, { new: true })
        debitor = await User.findByIdAndUpdate(req.body.debitUser, {
          $push: { transactions: transaction._id }
        }, { new: true })
      } else {
        // user sent money
        creditor = await User.findByIdAndUpdate(req.body.creditUser, {
          $push: { transactions: transaction._id },
          $inc: { balance: + transaction.amount }
        }, { new: true })
        debitor = await User.findByIdAndUpdate(req.body.debitUser, {
          $push: { transactions: transaction._id },
          $inc: { balance: - transaction.amount }
        }, { new: true })
      }
      res.status(200).json(transaction._doc)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }

  },

  async acceptTransaction(req, res) {
    try {
      const t = await Transaction.findByIdAndUpdate(req.params.transactionId, {
        pending: false
      }, { new: true })
      const transaction = await Transaction.findById(t._id).populate('creditUser').populate('debitUser')

      await User.findByIdAndUpdate(t.creditUser, {
        $inc: { balance: + t.amount }
      }, { new: true })
      const debitor = await User.findByIdAndUpdate(t.debitUser, {
        $inc: { balance: - t.amount }
      }, { new: true })

      res.status(200).json({ transaction, balance: debitor.balance })
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async declineTransaction(req, res) {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.transactionId)
      const creditor = await User.findByIdAndUpdate(transaction.creditUser, {
        $pull: { transactions: { _id: transaction._id } }
      })
      const debitor = await User.findByIdAndUpdate(transaction.debitUser, {
        $pull: { transactions: { _id: transaction._id } }
      })
      res.status(200).json({ msg: 'success' })
    } catch (error) {
      console.trace(error)
      res.status(500).json(error)
    }
  }

}

