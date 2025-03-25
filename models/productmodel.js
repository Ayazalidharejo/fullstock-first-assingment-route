const mongoose = require("mongoose")


const productsschema = new mongoose.Schema({
name:{type:String,required:true},
price:{type:Number,required:true},
description:{type:String},
category:{type:String,required:true},
weight:{type:Number},
unites:{type:Number},
ImageBase64:{type:String},
user:{type:mongoose.Schema.Types.ObjectId ,ref:"User", required:true}

},{timestamps:true})


module.exports =mongoose.model("product",productsschema);