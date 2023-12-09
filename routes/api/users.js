const express = require("express");
const {validateBody, authenticate} = require("../../middlewares/index");
const {userSchemas} = require("../../models/user");
const {
    register,
    login,
    getCurrent,
    logout,
    changeSubscription,
  } = require("../../controllers/users");

const router = express.Router();


router.post("/register", validateBody(userSchemas.registerSchema), register);

router.post("/login", validateBody(userSchemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/",authenticate,validateBody(userSchemas.subscriptionSchema),changeSubscription);


module.exports = router;