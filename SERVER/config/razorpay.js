
// instance 
const Razorpay = require("razorpay");

require("dotenv").config();
// razorpay cha instance 
exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})

console.log("Razorpay Credentials:", process.env.RAZORPAY_KEY , process.env.RAZORPAY_SECRET)
// console.log("Order Options:", options);
