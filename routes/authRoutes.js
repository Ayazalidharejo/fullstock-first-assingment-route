const express = require ("express")
const {register, login, getuserprofile, Forgetpassword, resetpassword} =require ("../controllers/authcontroler");
const authenticationToken = require("../middleware/authmiddleware");
const router =express.Router();

// register rounte user
router.post("/register",register)

//login rounte user
router.post("/login",login)

// forget password rounte user

router.post("/forgot-password",Forgetpassword)
router.post("/reset-password/:token",resetpassword)

// user profile rounte 

router.get("/userprofile",authenticationToken,getuserprofile)


module.exports=router;