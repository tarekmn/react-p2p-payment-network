const router = require("express").Router();
const {
  requestContact,
  acceptRequest,
  cancelRequest
} = require("../../controllers/contact-controller");

router.get('/:userId/:friendId', requestContact)
router.post('/', acceptRequest)
router.delete('/:contactId', cancelRequest)

module.exports = router
