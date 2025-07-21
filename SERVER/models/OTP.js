const mongoose= require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  createdAt:{
    type:Date,
    default:Date.now(),
    expires: 60*5               // OTP ----> expire in 5 min --> it Temporary is stored in DB --> 5*60  300 || 
  }
});


// sending mail section here
async function sendVerificationEmail(email,otp){
    try {
        //mail cha response 
        const mailResponse = await mailSender(email,"Verification Email From study Notion",emailTemplate(otp) );
        console.log("Email send succesfully" , mailResponse);

        
    } catch (error) {
        console.log("Error in sending Gmail ", error);
        throw error;
    }
}

// document save hony agodar Mail gela pahije broo --> ha mail user ne signup kelyavr --> user Verification sathi mail ahe 

// pre-save middleware function is used 
OTPSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();  // go to the next middleware 
})

module.exports = mongoose.model("OTP",OTPSchema)