const express = require("express");
const authenticationToken = require("../middleware/authmiddleware");
const { addproduct } = require("../controllers/usercontroler");

const routes =express.Router();

routes.post("/add-products",authenticationToken,addproduct)



module.exports=routes;