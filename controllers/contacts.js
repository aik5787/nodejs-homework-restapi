const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers/index");


const listContacts = async (req, res) => {
    const result = await Contact.find();
    res.status(200).json(result);
  };
  
  const getContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
  };

  const removeContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  };

  const addContact = async (req, res) => {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };

  const updateContact = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
  
    if (!result) throw HttpError(404, "Not found");
  
    res.status(200).json(result);
  };

  const updateFavorite = async (req, res) => {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
  
    if (!result) throw HttpError(404, "Not found");
  
    res.status(200).json(result);
  };
  module.exports = {
    listContacts: ctrlWrapper(listContacts),
    getContactById: ctrlWrapper(getContactById),
    removeContact: ctrlWrapper(removeContact),
    addContact: ctrlWrapper(addContact),
    updateFavorite: ctrlWrapper(updateFavorite),
    updateContact: ctrlWrapper(updateContact),
  };