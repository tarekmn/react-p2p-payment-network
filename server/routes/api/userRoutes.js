const router = require('express').Router()

const {
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



module.exports = router;