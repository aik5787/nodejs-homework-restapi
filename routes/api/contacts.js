const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateFavorite,
  updateContact,
} = require("../../controllers/contacts");

const {validateContactBody, isValidId} = require("../../middlewares/index");
const {schemas} = require("../../models/contact");

const router = express.Router()

router.get('/', listContacts);

router.get('/:contactId',isValidId, getContactById);

router.post('/', validateContactBody(schemas.scheme), addContact);

router.delete('/:contactId',isValidId,removeContact );

router.put('/:contactId',isValidId, validateContactBody(schemas.scheme), updateContact)

router.put('/:contactId/favorite',isValidId, validateContactBody(schemas.favoriteContactScheme), updateFavorite)

module.exports = router
