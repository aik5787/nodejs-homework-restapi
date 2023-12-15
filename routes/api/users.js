const express = require("express");
const {validateBody, authenticate, upload,} = require("../../middlewares/index");
const {userSchemas} = require("../../models/user");
const {
    register,
    login,
    getCurrent,
    logout,
    changeSubscription,
    uploadAvatar,
  } = require("../../controllers/users");

const router = express.Router();


router.post("/register", validateBody(userSchemas.registerSchema), register);

router.post("/login", validateBody(userSchemas.loginSchema), login);

router.post("/logout", authenticate, logout);

router.get("/current", authenticate, getCurrent);

router.patch("/",authenticate,validateBody(userSchemas.subscriptionSchema),changeSubscription);

router.patch("/avatars", authenticate, upload.single("avatar"), uploadAvatar);

module.exports = router;