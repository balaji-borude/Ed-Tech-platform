const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB_URL= process.env.MONGODB_URL;

exports.connect =()=>{
    mongoose.connect(MONGODB_URL)
    .then(()=>{
        console.log("DB Connected succesfully")

    })
    .catch((error)=>{
        console.log(error)
        console.log("DB Connection Failed");
        process.exit(1);
    })
}