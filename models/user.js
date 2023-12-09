const { Schema, model } = require("mongoose");
const {MongooseError} = require("../helpers/index");
const Joi = require("joi");

const SUBLIST = ["starter", "pro", "business"];
const EMAILREGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
    {
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      email: {
        type: String,
        match: EMAILREGEX,
        required: [true, "Email is required"],
        unique: true,
      },
      subscription: {
        type: String,
        enum: SUBLIST,
        default: "starter",
      },
      token: {
        type: String,
        default: null,
      },
    },
    { versionKey: false, timestamps: true }
  );

  userSchema.post("save", MongooseError);


  const registerSchema = Joi.object({
    email: Joi.string().pattern(EMAILREGEX).required(),
    password: Joi.string().min(6).required(),
  });
  
  const loginSchema = Joi.object({
    email: Joi.string().pattern(EMAILREGEX).required(),
    password: Joi.string().min(6).required(),
  });

  const subscriptionSchema = Joi.object({
    subscription: Joi.string()
      .valid(...SUBLIST)
      .required(),
  });

  const userSchemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
  };

  const User = model("user", userSchema);

  module.exports = {
    User,
    userSchemas,
  };