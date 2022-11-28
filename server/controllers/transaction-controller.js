// ObjectId() method for converting transactionID string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const { User, Transaction, Party } = require("../models");

require("dotenv").config()


module.exports = {
  // Get all transaction
  async getTransaction(req, res) {
    try {
      const data = await Transaction.find({})

      if (!data) {
        return res.status(404).json({ message: 'No data in db.' })
      }
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },


  async getSingleTransaction(req, res) {
    try {
      const data = await Transaction.findOne({ _id: req.params.transactionID })
      if (!data) {
        return res.status(404).json({ message: 'No transaction in db with that ID' })
      }
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
  },


  // async createWildcard(req, res) {
  //   try {
  //     const data = await Wildcard.create(req.body)

  //     // update user with new transaction
  //     const updatetransaction = await Transaction.findByIdAndUpdate(
  //       { _id: req.params.transactionID },
  //       { $push: { wildcard: data } },
  //       { new: true }
  //     )

  //     res.status(200).json(data)
  //   } catch (error) {
  //     console.log(error.message)
  //     res.status(500).json(error)
  //   }

  // },

  // async deleteWildcard(req, res) {
  //   try {
  //     const data = await Party.findOneAndRemove(
  //       { _id: req.params.wildcardId })

  //     const updatetransaction = await Transaction.findByIdAndUpdate(
  //       { _id: req.params.transactionID },
  //       { $pull: { wildcard: req.params.wildcardId } },
  //       { new: true }
  //     )

  //     if (!data) {
  //       return res.status(404).json({ message: 'No such transaction exists' })
  //     }



  //     res.status(200).json(data)
  //   } catch (error) {
  //     console.log(error.message)
  //     res.status(500).json(error)
  //   }
  // },




};

