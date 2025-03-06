require("dotenv").config();
const express = require("express");
const connectdb = require("./mongodb/db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");
const app = express();

connectdb();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("routes");
});

app.get("/users", (req, res) => {
  console.log("User login sussfully");
  res.end("This is from Ayaz ali");
});

app.post("/creareUser", async (req, res) => {
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
});

app.post("/login", async (req, res) => {
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
});

app.delete("/users/:id", (req, res) => {
  const Userid = req.params;
  console.log(Userid);
  res.json({ massage: "user delete sussesfully", Userid });
});




//athintication token 


  const authenticationToken  = (req,res,next)=>{
    

    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({massage: "Access denited token "})
    }
    try {
    const decodetoken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    req.user =decodetoken;
    next();

  } catch (error) {
    res.status(401).json({massage:error})
  }

}

app.get("/userprofile",authenticationToken  , async (req,res)=>{

try {
  
  const user = await User.findById(req.user.Userid).select("-password")
  if (!user) {
   return res.status(404).json({massage:"user not found "})
  
  }
  res.json(user)

} catch (error) {
  res.status(500).json({ message: "Server error" });
}

})






app.listen(8000, () => {
  console.log("server is runing on 8000 and we are ");
});
