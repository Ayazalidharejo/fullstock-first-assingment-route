const Order = require("../models/Ordermodel");

const placeorder = async (req,res)=>{
    user= req.user.Userid
    console.log(user,"how re you")

    try {
        const {orderitems,shippingaddress,paymentmethed,totalprice}=req.body;


        if (!orderitems || orderitems.length === 0 ) {
            return res.status(400).json({message:"please  send items for place "})
        }
        const newOrder =new Order({
            // user:req.user.Userid,
            user: req.user.Userid,
            orderitems,
            shippingaddress,
            paymentmethed,
            totalprice
        })
       const createorderUser = await newOrder.save();
       
       res.status(201).json(createorderUser);
        
        
    } catch (error) {
        res.status(500).json({message:"server error internal server error"})
        
    }

}

module.exports =placeorder;