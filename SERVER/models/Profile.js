const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({

    gender:{
        type:String,
    },
    dateOfBirth:{
        type:String
    },
    about:{
        type:String,
        trim:true
    },
    contactNumber:{
        type:Number,
        trim:true  // It is used to REMOVE white space from begining and ending of input field 
    }
});

module.exports = new mongoose.model("Profile", profileSchema);