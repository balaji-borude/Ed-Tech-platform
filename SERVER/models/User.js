const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
     
    },
    accountType:{
        type:String,
        enum:["Admin","Instructor","Student"],   // account type is selected from this enum Only 
        required:true
    },	
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    additionalDetails:{
        type: mongoose.Schema.Types.ObjectId,  //is used for referencing another document in a different collection. of mongoDb 
        ref:"Profile"  // wari ghetleli objectId hi Profile Collection chi asel 
    },

    courses:[
        {           // yehte apan array gheu shakto ka --> if student buy multiple courses
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    token: {
        type: String,
    },
    resetPasswordExpires: {
        type: Date,
    },
    
    image:{
        type:String,
        required:true
    },
    
    courseProgres:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }


})

module.exports = mongoose.model("User",UserSchema);