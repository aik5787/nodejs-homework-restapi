const express = require('express')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateStatusContact,
  updateContact,
} = require("../../controllers/contacts");

const {validateBody, validateBodyStatus, isValidId, authenticate} = require("../../middlewares/index");
const {contactSchemas} = require("../../models/contact");

const router = express.Router()

router.get('/', authenticate, listContacts);

router.get('/:contactId',authenticate, isValidId, getContactById);

router.post('/', authenticate, validateBody(contactSchemas.scheme), addContact);

router.delete('/:contactId', authenticate, isValidId,removeContact );

router.put('/:contactId', authenticate, isValidId, validateBody(contactSchemas.scheme), updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBodyStatus(contactSchemas.favoriteContactScheme), updateStatusContact);

module.exports = router
