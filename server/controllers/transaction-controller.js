// ObjectId() method for converting transactionID string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Transaction } = require("../models");

require("dotenv").config()

module.exports = {


  async getAllTransactions(req, res) {
    try {
      const data = await Transaction.find({}).populate("sendingUser").populate("recievingUser")

      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async getTransactions(req, res) {
    try {
      const sent = await Transaction.find({ sendingUser: req.params.userId }).populate("sendingUser").populate("recievingUser")
      const recieved = await Transaction.find({ recievingUser: req.params.userId }).populate("sendingUser").populate("recievingUser")
      const data = sent.concat(recieved)
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async createTransaction(req, res) {
    try {
      const data = await Transaction.create(req.body)
      res.status(200).json(data)
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

