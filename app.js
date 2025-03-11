require("dotenv").config();
const cors = require('cors')
const express = require("express");
const connectdb = require("./config/db");
const authRoutes =require("./routes/authRoutes")
const userroutes =require("./routes/userRoutes")
const app = express();
app.use(cors());

//connectddb
connectdb();


//middleware parsing json
app.use(express.json());

app.use("/auth",authRoutes)


app.use("/user",userroutes)

app.listen(8000, () => {
    console.log("server is runing on 8000 and we are ");
  });
  