const { ObjectId } = require("mongoose").Types;
const { User, Transaction } = require("../models");
const jwt = require("jsonwebtoken")
const cookie = require("cookie")
const bcrypt = require("bcrypt")
const connection = require("../config/connection")
require('dotenv').config()

module.exports = {

  async getUserByUsername(req, res) {
    try {
      const friend = await User.findOne({
        username: req.params.username
      })
      res.status(200).json(friend)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async getAllUsers(req, res) {
    try {
      const data = await User.find({})
      res.status(200).json(data)
      // res.status(200).json(data.map(d => d.username))
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async createUser(req, res) {
    try {
      const data = User.create(req.body)
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }

  },

  async updateUser(req, res) {
    try {
      const data = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body })
      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async deleteUser(req, res) {
    try {
      const data = await User.findOneAndRemove(
        { _id: req.params.userId })

      if (!data) {
        res.status(404).json({ message: 'No such user exists' })
      }

      const removeTransaction = await Transaction.deleteMany({ username: req.params.userId })

      res.status(200).json(data)
    } catch (error) {
      console.log(error.message)
      res.status(500).json(error)
    }
  },

  async authenticateLogin(req, res) {
    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) return res.status(401).json({ message: "Login failed." })

    const isValid = await bcrypt.compare(req.body.password, foundUser.password)
    if (!isValid) return res.status(401).json({ message: "Login failed." })

    const { password, ...modifiedUser } = foundUser
    const token = jwt.sign({ _id: foundUser._id, email: foundUser.email }, process.env.JWT_SECRET)

    res
      .status(200)
      .set({ "auth-token": token })
      .json({ result: "success", user: modifiedUser, token: token })
  },

  async lookupUserByToken(req, res) {
    if (!req.headers || !req.headers.cookie) return res.status(401).json({ msg: "un-authorized" })

    const cookies = cookie.parse(req.headers.cookie)
    const token = cookies["auth-token"]  //cookies.authToken
    if (!token) return res.status(401).json({ msg: "un-authorized" })

    const isVerified = jwt.verify(token, process.env.JWT_SECRET)
    if (!isVerified) return res.status(401).json({ msg: "un-authorized" })

    const user = await User.findById(isVerified._id).populate({
      path: 'contacts',
      select: 'username image _id'
    })
    if (!user) return res.status(401).json({ msg: "un-authorized" })

    return res.status(200).json({ result: "success", payload: user })
  }
}