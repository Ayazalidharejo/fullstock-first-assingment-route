const User = require("../models/User");
const addproduct = async (req, res) => {
  try {
    const { name, price, category, weight, unites, description } = req.body;
    const userid = req.user.Userid;

    const userisexist = await User.findById(userid);
    if (!userisexist) {
      return res.status(404).json({ massage: "user not found" });
    }
    userisexist.products.push({
      name,
      price,
      category,
      weight,
      unites,
      description,
    });
    await userisexist.save();

    res.status(200).json({ massage: "product added succsfully",userisexist });
  } catch (error) {
    console.log(error);
    res.status(500).json({ massage: "server error" || error.massage });
  }
};

module.exports = { addproduct };
