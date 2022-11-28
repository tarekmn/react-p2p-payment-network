const router = require("express").Router();
const {
  getTransactions,
  createTransaction,
  updateTransaction,
} = require("../../controllers/transaction-controller");

router.get('/:userId', getTransactions)

module.exports = router;
