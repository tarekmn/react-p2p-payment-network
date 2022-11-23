const router = require("express").Router();
const {
  getTransaction,
  getSingleTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  createWildcard,
  deleteWildcard
} = require("../../controllers/transaction-controller");

// // /api/transaction
router.route("/").get(getTransaction).post(createTransaction);

// /api/transaction/:transactionId
router.route("/:transactionID").get(getSingleTransaction).put(updateTransaction).delete(deleteTransaction);

// /api/transaction/:transactionID/wildcard
router.route("/:transactionID/wildcard").post(createWildcard)

router.route("/:transactionID/wildcard/:wildcardID").delete(deleteWildcard);

module.exports = router;
