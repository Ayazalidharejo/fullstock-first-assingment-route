const ordermodel = require("../models/ordermodel");

const placeorder = async (req,res)=>{

    try {
        const {orderitems,shippingaddress,paymentmethed,totalprice}=req.body;


        if (!orderitems || orderitems.length === 0 ) {
            return res.status(400).json({message:"please  send items for place "})
        }
        const order =new ordermodel({
            user:req.user.Userid,
            orderitems,
            shippingaddress,
            paymentmethed,
            totalprice
        })
       const createorderUser = await order.save();
       
       res.status(201).json(createorderUser);
        
        
    } catch (error) {
        res.status(500).json({massage:"server error internal server error",error:massage})
        
    }

}

module.exports =placeorder;