const router = require('express').Router()

const {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  authenticateLogin,
  lookupUserByToken

} = require('../../controllers/user-controller')

router.route("/lookup").get(lookupUserByToken)
router.route("/auth").post(authenticateLogin)
router.route("/:userId").put(updateUser).delete(deleteUser)
router.post('/signup', createUser)
router.get('/', getAllUsers)



module.exports = router;