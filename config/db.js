//ye b kam kar rha hai connect ho rha hai as se b
// const mongoose = require('mongoose');

// mongoose.connect("mongodb+srv://ayazalixwave:@cluster0.95kzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("MongoDB is connected");
// }).catch((err) => {
//     console.log(err);
// });




// second way as se b ho rha hai 
const mongoose = require('mongoose');
const connectdb = async ()=>{

    try {
        await mongoose.connect(`mongodb+srv://ayazalixwave:${process.env.DB_PASSWORD}@cluster0.95kzp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB is connected");
    } catch (err) {
        console.error("mongodb error",err);
        
    }
}
module.exports =connectdb;