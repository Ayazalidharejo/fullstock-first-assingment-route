const jwt = require("jsonwebtoken");
//athintication token 


  const authenticationToken  = (req,res,next)=>{
    

    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({massage: "Access denited token "})
    }
    try {
    const decodetoken = jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log(decodetoken); // Check token payload structure
req.user = decodetoken;
    req.user =decodetoken;
    console.log(decodetoken)
    
    next();

  } catch (error) {
    res.status(401).json({massage:error})
  }

}

module.exports = authenticationToken;