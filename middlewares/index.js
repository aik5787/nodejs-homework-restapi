const {validateBody, validateBodyStatus} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports =  {validateBody,validateBodyStatus, isValidId, authenticate, upload};