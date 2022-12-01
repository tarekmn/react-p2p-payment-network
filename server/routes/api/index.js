const router = require("express").Router()
const userRoutes = require("./userRoutes")
const transactionRoutes = require("./transactionRoutes")
const contactRoutes = require('./contactRoutes')

router.use("/users", userRoutes)
router.use("/transaction", transactionRoutes)
router.use('/contact', contactRoutes)

module.exports = router
