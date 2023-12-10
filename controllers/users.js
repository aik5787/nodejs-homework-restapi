const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const { HttpError, ctrlWrapper } = require("../helpers/index");


const register = async (req, res, next) => {
  const { email, password} = req.body;

  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "Email in use");
  
  const hashPassword = await bcrypt.hash(password, 10);
  
    const newUser = await User.create({ ...req.body, password: hashPassword });
    res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
      },
    });
  };


  const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw HttpError(401, "Email or password is wrong");
    }
    const { id, subscription } = user;
    const payload = { id };

  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});

  await User.findByIdAndUpdate(id, { token });

  res.status(200).json({ token, user: { email, subscription } });

  }

  const logout = async (req, res) => {
    const { id } = req.user;
    await User.findByIdAndUpdate(id, { token: "" });
    res.status(204).send();
  };

  const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.json({ email, subscription });
  };
  
  const changeSubscription = async (req, res, next) => {
    const { id, email } = req.user;
    const { subscription } = req.body;
  
    const result = await User.findByIdAndUpdate(id, req.body, { new: true });
  
    if (!result) throw HttpError(404, "Not found");
  
    res.status(200).json({ id, email, subscription });
  };
  


  module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    changeSubscription: ctrlWrapper(changeSubscription),
  };