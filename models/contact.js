const { Schema, model } = require("mongoose");
const {MongooseError} = require("../helpers/index");
const Joi = require("joi");

const contactSchema = new Schema({
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true });

  const scheme = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  }).messages({ "any.required": "missing required {#key} field" });

  const favoriteContactScheme = Joi.object({
    favorite: Joi.boolean().required(),
  });
  const schemas = {
    scheme, favoriteContactScheme
  };

  contactSchema.post("save", MongooseError);

  const Contact = model("contact", contactSchema);

  module.exports = { Contact, schemas };