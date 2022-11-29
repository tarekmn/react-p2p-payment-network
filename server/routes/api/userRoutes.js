const router = require('express').Router()

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  authenticateLogin,
  lookupUserByToken

} = require('../../controllers/user-controller')

router.route('/').get(getAllUsers).post(createUser)
router.route("/lookup").get(lookupUserByToken)
router.route("/auth").post(authenticateLogin)
router.route("/:userId").put(updateUser).delete(deleteUser)




module.exports = router;