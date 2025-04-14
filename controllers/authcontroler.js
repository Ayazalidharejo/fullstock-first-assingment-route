const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken");
const crypto =require("crypto");
const sendEmail = require("../utiles/sendemail");
const { passwordresttemples } = require("../utiles/emailRemples");

const Forgetpassword = async (req,res) =>{

  const {email} =req.body;
 if (!email) {
  return res.status(400).json({massage:"email is required"})
 }

 const user = await  User.findOne ({email});
 console.log("User found ayaz:", user);

 if (!user) {
  return res.status(404).json({massage:"user not found "})
 }
 //ganerate token

 const token = crypto.randomBytes(32).toString("hex")

 user.resetpasswordtoken =token
 
 user.resetpasswordexpries =Date.now() + 3600000 ;//11 hour


 await user.save();

 const restURL =`http://localhost:8080/auth/forgot-password/${token}`;

 try {
  
  await sendEmail({
    to:user.email,
    subject: "password reset request",
    html:passwordresttemples(user.firstname,restURL),
  }),

  
  res.json({message: "password reset link send to your email successfully"})
 } catch (error) {
  res.status(500).json({message: "error sending email"});
 }
};



const resetpassword= async (req ,res) =>{
const {token}= req.params;
const {password}=req.body;

const user=await User.findOne({
  resetpasswordtoken:token,
  resetpasswordexpries:{$gt: Date.now()}
})
if (!user) {
  return res.status(404).json({massage:"user not found "})
 }
 const hashedpassword = await bcrypt.hash(password, 12);
 user.password =hashedpassword;
 user.resetpasswordtoken =undefined;
 user.resetpasswordexpries=undefined;

 await user.save();
 res.json({message:"password reset successfully"})
};

const register = async (req, res) => {
  const { firstname, lastname, email, password,role } = req.body;
  if (!firstname || !email || !password) {
    return res.json({ massage: " All field is required" });
  }

  const isexist = await User.findOne({ email });
  if (isexist) {
    return res.json({ massage: " user already exist" });
  }

  const hashedpassword = await bcrypt.hash(password, 12);
  console.log(hashedpassword);

  const newUser = new User({
    firstname,
    lastname,
    email,
    role,
    password: hashedpassword,
  });

  await newUser.save();
  res.status(201).json({ massage: "User create successfully", newUser });
};


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({ massage: " All field is required" });
  }

  const isexist = await User.findOne({ email });
  console.log(isexist);

  if (!isexist) {
    return res.json({ massage: "something went wrong " });
  }
  const ispasswordmatch = await bcrypt.compare(password, isexist.password);

  if (!ispasswordmatch) {
    return res.json({ massage: "something went wrong" });
  }
  //token generate
  const token = jwt.sign({ Userid: isexist._id ,role:isexist.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
  res.json({
    massage: "login successfully",
    user: {
      id: isexist._id,
      username: isexist.firstname + " " + isexist.lastname,
      email: isexist.email,
      role:isexist.role,
      token: token,
    },
  });
}



const getuserprofile = async (req,res)=>{

    try {
      
      const user = await User.findById(req.user.Userid).select("-password")
      if (!user) {
       return res.status(404).json({massage:"user not found "})
      
      }
      res.json(user)
    
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
    
    }


    module.exports = {register ,login , getuserprofile,Forgetpassword,resetpassword}