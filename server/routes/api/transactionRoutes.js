const router = require("express").Router();
const {
  getTransactions,
  getAllTransactions,
  createTransaction,
  acceptTransaction,
  declineTransaction
} = require("../../controllers/transaction-controller");

router.route('/')
.get(getAllTransactions)
.post(createTransaction)

router.route('/:transactionId')
.get(acceptTransaction)
.delete(declineTransaction)

router.get('/:userId', getTransactions)


module.exports = router;
