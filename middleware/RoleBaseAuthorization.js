const Checkrole =(roles)=>{
return (req,res,next)=>{
if (!roles.includes (req.user.role)) {
   return res.status(403).json({massage:"permission denied"}) 
}
next();
}
}
module.exports= Checkrole;