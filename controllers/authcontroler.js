const bcrypt = require("bcrypt");
const User = require("../models/User")
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
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
  const token = jwt.sign({ Userid: isexist._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "12h",
  });
  res.json({
    massage: "login successfully",
    user: {
      id: isexist._id,
      username: isexist.firstname + " " + isexist.lastname,
      email: isexist.email,
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


    module.exports = {register ,login , getuserprofile}