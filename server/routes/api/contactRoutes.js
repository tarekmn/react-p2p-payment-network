const router = require("express").Router();
const {
  requestContact,
  addContact
} = require("../../controllers/contact-controller");

router.get('/:userId/:friendId', requestContact)
router.post('/add', addContact)

module.exports = router
