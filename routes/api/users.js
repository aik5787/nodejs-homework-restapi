const express = require("express");
const {validateBody, authenticate} = require("../../middlewares/index");
const {userSchemas} = require("../../models/user");
const {
    register,
    login,
    getCurrent,
  } = require("../../controllers/users");

const router = express.Router();


router.post("/register", validateBody(userSchemas.registerSchema), register);

router.post("/login", validateBody(userSchemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);



module.exports = router;