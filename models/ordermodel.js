const mongoose = require("mongoose");

const orderschema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  orderitems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      name:String,quantity:{type:String,required:true},price:{type:Number,required:true}

    },
  ],
  shippingaddress: {
    address: { type: String, required: true },
  },
  paymentmethed: { type: String },
  totalprice: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderschema);
