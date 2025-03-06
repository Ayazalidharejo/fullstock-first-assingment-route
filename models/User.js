
const mongoose =require ("mongoose");

const Userschema = new mongoose.Schema({
firstname:{type:String,required:true,minlength:3,maxlength:12},
lastname:{type:String},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
},{timestamps:true})


module.exports =mongoose.model("User",Userschema)