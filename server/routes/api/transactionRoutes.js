const router = require("express").Router();
const {
  getTransactions,
  getAllTransactions,
  createTransaction,
  updateTransaction,
} = require("../../controllers/transaction-controller");

router.get('/', getAllTransactions)
router.get('/:userId', getTransactions)


module.exports = router;
