const productmodel = require("../models/productmodel");
const User = require("../models/User");
// const addproduct = async (req, res) => {
//   try {
//     const { name, price, category, weight, unites, description } = req.body;
//     const userid = req.user.Userid;

//     const userisexist = await User.findById(userid);
//     if (!userisexist) {
//       return res.status(404).json({ massage: "user not found" });
//     }
   
//     const ImageBase64 = req.file.buffer.toString("base64");


//     const product = new  productmodel({
//       name, price, category, weight, unites, description,ImageBase64,user:userid,
//     })

//     const createProduct= await product.save();

//     res.status(201).json(createProduct)

//     await userisexist.save();

//     res.status(200).json({ massage: "product added succsfully",userisexist });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ massage: "server error" || error.massage });
//   }
// };

// const addproduct = async (req, res) => {
//   try {
//     const { name, price, category, weight, unites, description } = req.body;
//     const userid = req.user.Userid;

//     const userisexist = await User.findById(userid);
//     if (!userisexist) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ message: "Image is required!" });
//     }

//     const ImageBase64 = req.file.buffer.toString("base64");

//     const product = new productmodel({
//       name,
//       price,
//       category,
//       weight,
//       unites,
//       description,
//       ImageBase64,
//       user: userid,
//     });
//     const createProduct = await product.save();

//     userisexist.products.push(createProduct._id);
//     await userisexist.save();

//     return res.status(201).json({ message: "Product added successfully", product });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

const addproduct = async (req, res) => {
  try {
    const { name, price, category, weight, unites, description } = req.body;
    const userid = req.user.Userid;

    const userisexist = await User.findById(userid);
    if (!userisexist) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required!" });
    }

    const ImageBase64 = req.file.buffer.toString("base64");

    const product = new productmodel({
      name,
      price,
      category,
      weight,
      unites,
      description,
      ImageBase64,
      user: userid,
    });

    const createProduct = await product.save();

    userisexist.products.push(createProduct._id);
    await userisexist.save();

    return res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
const getallproduct = async (req,res)=>{

  try {
    const userid = req.user.Userid;
const userr = await User.findById(userid).populate("products")
if (!userr) {
  return res.status(404).json({massage:"user not found "})
 
}
res.status(200).json({massage:"user products",products :userr.products})
console.log(userr);

  } catch (error) {
    res.status(500).json({massage:"server error internal server error",error:massage})
  }

  
}

const edituserproduct = async (req,res)=>{
try {
  const userid = req.user.Userid;
  const {name,price,description,category,weight,unites} =req.body
  const {productsId} =req.params

  const userr = await User.findById(userid)
if (!userr) {
  return res.status(404).json({massage:"user not found "})
 
}
 const product =userr.products.id(productsId);
 if (!product) {
  return req.status(404).json({massage:"product not found"})
 }
 product.name = name
 product.price = price
 product.description = description
 product.category = category
 product.weight = weight
 product.unites = unites

 await userr.save();
 res.status(200).json({massage:"product updateted succesfully"});

} catch (error) {
  
  console.log(error);
  res.status(500).json({massage:"server error internal server error"})
}

}
const deleteuserproduct = async (req,res)=>{
try {
  const userid = req.user.Userid;
  const {productsId} =req.params

  const userr = await User.findById(userid)
if (!userr) {
  return res.status(404).json({massage:"user not found "})
 
}
 const product =userr.products.id(productsId);
 if (!product) {
  return req.status(404).json({massage:"product not found"})
 }

 product.deleteOne()
 await userr.save();
 res.status(200).json({massage:"product deleted succesfully"});

} catch (error) {
  
  console.log(error);
  res.status(500).json({massage:"server error internal server error"})
}

}
module.exports = { addproduct ,getallproduct,edituserproduct,deleteuserproduct };
