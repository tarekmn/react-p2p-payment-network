const router = require("express").Router();
const {
  getTransactions,
  getAllTransactions,
  createTransaction,
  updateTransaction,
} = require("../../controllers/transaction-controller");

router.route('/')
.get(getAllTransactions)
.post(createTransaction)

router.get('/:userId', getTransactions)


module.exports = router;
