
const express =require ("express");
const authenticationToken = require("../middleware/authmiddleware");
const placeorder = require("../controllers/ordercontroller");

const routes =express.Router();



routes.post("/place-order",authenticationToken,placeorder)

module.exports=routes;