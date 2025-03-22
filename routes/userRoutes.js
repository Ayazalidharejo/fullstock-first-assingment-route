const express = require("express");
const authenticationToken = require("../middleware/authmiddleware");
const { addproduct, getallproduct, edituserproduct, deleteuserproduct,  } = require("../controllers/usercontroler");
const upload = require("../middleware/upload");

const routes =express.Router();

routes.post("/add-products",authenticationToken,upload.single("image"),addproduct)
routes.get("/get-all-products",authenticationToken,getallproduct)
routes.put("/products/:productsId",authenticationToken,edituserproduct)
routes.delete("/delete-products/:productsId",authenticationToken,deleteuserproduct)



module.exports=routes;