const express = require ("express")
const {register, login, getuserprofile} =require ("../controllers/authcontroler");
const authenticationToken = require("../middleware/authmiddleware");
const router =express.Router();

// register rounte user
router.post("/register",register)

//login rounte user
router.post("/login",login)

// user profile rounte 

router.get("/userprofile",authenticationToken,getuserprofile)


module.exports=router;