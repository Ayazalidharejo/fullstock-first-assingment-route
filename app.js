require("dotenv").config();
const cors = require('cors')
const express = require("express");
const connectdb = require("./config/db");
const authRoutes =require("./routes/authRoutes")
const userroutes =require("./routes/userRoutes")
const adminRountes = require("./routes/adminRountes")
const bodyParser =require("body-parser")
const orderRoutes =require("./routes/orderRoutes")
const app = express();
app.use(cors());

//connectddb
connectdb();


//middleware parsing json
app.use(express.json());
app.use(bodyParser.json({limit:"3mb"}))

app.use("/auth",authRoutes)


app.use("/user",userroutes)

app.use("/admin",adminRountes)

app.use("/order",orderRoutes)

app.listen(8000, () => {
    console.log("server is runing on 8000 and we are ");
  });
  