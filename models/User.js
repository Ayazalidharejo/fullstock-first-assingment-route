
const mongoose =require ("mongoose");
const productsschema = new mongoose.Schema({
name:{type:String,require:true},
price:{type:Number,require:true},
description:{type:String},
category:{type:String,require:true},
weight:{type:Number},
unites:{type:Number}

},{timestamps:true})



const Userschema = new mongoose.Schema({
firstname:{type:String,required:true,minlength:3,maxlength:12},
lastname:{type:String},
email:{type:String,required:true,unique:true},
password:{type:String,required:true},
products:[productsschema]
},{timestamps:true})


module.exports =mongoose.model("User",Userschema)