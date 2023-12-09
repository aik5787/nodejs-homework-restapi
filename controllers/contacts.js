const {Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers/index");


const listContacts = async (req, res) => {
  const owner = req.user.id;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let result;

  if (!favorite) {
    result = await Contact.find({ owner }, "-createdAt -updatedAt", {
      skip,
      limit,
    });
  } else {
    result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email")}
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
    const result = await Contact.create({ ...req.body, owner: req.user.id });
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

  const updateStatusContact = async (req, res) => {
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
    updateStatusContact: ctrlWrapper(updateStatusContact),
    updateContact: ctrlWrapper(updateContact),
  };