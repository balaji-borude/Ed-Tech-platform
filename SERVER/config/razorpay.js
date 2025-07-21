

// instance 
const Razorpay = require("razorpay");

// razorpay cha instance 
exports.instance = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET
})