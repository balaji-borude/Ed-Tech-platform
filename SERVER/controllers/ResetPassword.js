const User = require("../models/User");
const bcrypt = require('bcrypt');
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

// reset-password-token
exports.resetPasswordToken = async (req,res) => {
   try {
     // get email from req body 
     const email = req.body.email;

     // check user for this email address
     const user = await User.findOne({email});
 
     if(!user){
         return res.json({
             success:false,
             message:`This Email :${email} is not Registered with us Enter a valid email address`
         })
     }
     // generete token 
     const token = crypto.randomUUID();
     //   OR ELSE we can do this --> const token = crypto.randomBytes(20).toString("hex");
 
     // update user by adding and expiration time 
     const updateDetails = await User.findOneAndUpdate({email:email},{
         token : token,
         resetPasswordExpires: Date.now()+5*60*1000,
     },
     {new:true});
 
     // create Url 
     const url = `http://localhost:3000/update-password/${token}`;
 
     //send mail 
     await mailSender(
                      email,
                     "password Reset Link",
                      ` password reset Link --> ${url} please Click this URL to reset  Password 
                   `);
 
     // return Response 
     return res.json({
         success:true,
         message:"Email sent Successfully , plwase check email and change Password"
     });

 
   } catch (error) {
    console.log("error in Reset- password",error); 
    return res.status(500).json({
        success:false,
        message:"something went Wrong While reset password "
    })
   }
};

// reset password
exports.resetPassword = async (req, res) => {
    try {
        // Fetch data from request body
        const { password, confirmPassword, token } = req.body;

        // Validation: Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        // Get user details from DB using Token
        const userDetails = await User.findOne({ token });

        // If user not found → Invalid token
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired token",
            });
        }

        // Check if token is expired 
        // userDetails.resetPasswordExpires yacha time -- kami pahije -- preset time pekksha tevahch ---> token expire nahi ahe ase samjel 
        if (userDetails.resetPasswordExpires < Date.now()) { 
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please generate a new reset link.",
            });
        }

        // Hash new password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Update user password & remove token fields
        await User.findOneAndUpdate(
            { token },
            {
                password: encryptedPassword,
                token: null, // Remove token so it can't be reused
                resetPasswordExpires: null, // Clear expiry field
            },
            { new: true }
        );

        // Return response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully. You can now log in.",
        });

    } catch (error) {
        console.error("Error resetting password:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while resetting the password.",
        });
    }
};

