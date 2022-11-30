const router = require("express").Router();
const {
  requestContact,
  acceptRequest,
  cancelRequest
} = require("../../controllers/contact-controller");

router.get('/:userId/:friendId', requestContact)
router.route('/:contactId')
.get(acceptRequest)
.delete(cancelRequest)

module.exports = router
