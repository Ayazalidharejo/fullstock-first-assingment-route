const multer =require("multer")

// config multer 

const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports =upload;