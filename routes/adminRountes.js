const express = require("express");
const authenticationToken = require("../middleware/authmiddleware");
const Checkrole = require("../middleware/RoleBaseAuthorization");
const  getadmindeshboard  = require("../controllers/admincontroller");
const routes =express.Router();



routes.get("/deshboard",authenticationToken,Checkrole(["admin"]),getadmindeshboard)

module.exports=routes;