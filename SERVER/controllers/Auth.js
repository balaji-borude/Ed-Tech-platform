const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile =  require("../models/Profile");
const mailSender = require("../utils/mailSender"); //this function is called to send mail if password is changed 
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const bcrypt = require('bcrypt');

const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");  // it is  a library
require("dotenv").config();


// signup  handler
exports.signUp= async(req,res)=>{
    try {
        // Destructure fields from the request body    
		const {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			accountType,
			contactNumber,
			otp,
		} = req.body;

        // validation of above password 
        if(!firstName || !lastName || !email || !password || !confirmPassword  || !accountType || !otp){
            return res.status(403).json({
                success:false,
                message:"All Field are Required"
            })
        };

        // check if password and confirm password is matching or not 
        if(password !== confirmPassword){
           return res.status(400).json({
                success:false,
                message:"Password and ConfirmPassword Field do not matched> Please try again "
            });
        };

        // check email is already present or not 
        const existing_user = await User.findOne({email});

        if(existing_user){
           return res.status(400).json({
                success:false,
                message:'User is already Registered , Please LoggedIN '
            })
        };

        // find most resent OTP stored in user --> means DB  

        //const response = await OTP.find({ email }).sort({ createdAt: -1 });  // findOne()--> method gives an error
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);


        if (!response) {
            return res.status(400).json({
                success: false,
                message: "No OTP found for this email"
            });
        }
        // .sort({createdAt : -1}).limit(1);
        // 1.Finds the first document where the email field matches the given value.
        // 2. sort({createdAt : -1}) -->  Sorts the results in descending order (newest first) based on the createdAt field.
        // 3. .limit(1)--> Ensures that only one document (the most recent one) is returned.

        console.log("recent OTP in DB _----> ", response);

            //validate Otp 
        if (response.length === 0) {
			// OTP not found for the email
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid fOr Length",
			});
		} else if (otp !== response[0].otp) {
			// Invalid OTP
			return res.status(400).json({
				success: false,
				message: "The OTP is not valid  ",
			});
		};

        //Find the most recent OTP for the email

        // const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
		// console.log(response);

		// if (response.length === 0) {
		// 	// OTP not found for the email
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});

		// } else if (otp !== response[0].otp) {
		// 	// Invalid OTP
		// 	return res.status(400).json({
		// 		success: false,
		// 		message: "The OTP is not valid",
		// 	});
		// };

        // Hash the Password 
        let hasshedPassword = await bcrypt.hash(password,10);

        console.log("Password is hashed now ",hasshedPassword);

        // Create the User 
        let approved ="";
        accountType === "Instructor" ? (approved=false):(approved=true);

        // dB Madhe Entry Create karne ahe 
        // profile detail la pahile Db madhe entry creat keli --> karan aple additional detail chi _ID --> pass karaychi ahe na signup madhe 
        
        // Create the Additional Profile For User
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth: null,
            about:null,
            contactNumber:null
        });

        // in Db profile detail is not showing whyy ?????????????????????????????????????????? --> Because of 
        console.log("Profile details", profileDetails);

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password:hasshedPassword,
            accountType,
            approved:approved,
            additionalDetails:profileDetails._id,  
           // additionalDetail :profileDetails._id, // yamdhe je profile detail ahe na tyachi id pass keli je profile Detail page 
           image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        console.log("This Entry is Stored in DataBase",user);

        // response succes send krar a
        return res.status(200).json({
            success:true,
            message:"User is Registered Succesfully",
            user
        });


    } catch (error) {

     res.status(500).json({
        success:false,
        message:"something went Wrong in SignUP !!  User cannot be Registerred , please try again ",
        error: error
     })
    }
};

// login handler
exports.login= async(req,res)=>{    
    try {
        // get email and Password from req.body 
        const {email,password} = req.body;
         
        // check if email and password is missing or not 
        if(!email || !password){
            // if missisng -->  Return 400 Bad Request status code with error message
            return res.status(400).json({
                success:false,
                message:"Please Fill the all field"
            })
        };

        // check kr email present ahe ka Db Madhe --> object Id chya Aivaji purn document retrive karnysathi populate usekartat 

        //Find user with provided email 
        const user = await User.findOne({email}).populate("additionalDetails");

        //The .populate("additionalDetails") method in Mongoose is used to replace an ObjectId reference with the actual document from another collection.
        // If User is not found with provided email
        if (!user) {
            // ERROR 2: Missing return statement causing headers to be sent twice
            return res.status(401).json({
                success: false,
                message: "User not registered. Please sign up."
            });
        }
        
        // Compare Password  and Generate JWT  token 
        if(await bcrypt.compare(password, user.password)){
            // jr password match zale tr TOKEN create karayche
             // create Jwt Token 
           const payload={
                id:user._id,
                email:user.email,
                accountType:user.accountType
            };
            //password:user.password --> do not send password in token   

            // jwt secret call kela
            const JWT_SCERET = process.env.JWT_SCERET;
            // option madhe Expirey set karaychi 
           const options={
                expiresIn:"24h"
            };

            // create token 
            const token =  jwt.sign(payload,JWT_SCERET,options);
            console.log("After LOgin Token is created---> ", token )
            
            // token la user madhe INSERT kele 
            // save token to user document in database
            //*******************impp********************************** */

            //const user = user.toObject();   // explicitly to object madhe convert karave lagte 
            user.token = token;              // const plain_user = user.toObject();
            user.password = undefined;

            // Set cookie for token and return success response
            // generate cookie
           const cookie_options = {
             expires:  new Date(Date.now()+ 3*24*60*60*1000), // cookie Expires in 3 day --> 3*24*60*60*1000
             httpOnly:true  // Prevents JavaScript from accessing the cookie (enhances security).
            };

            res.cookie("token",token,cookie_options).status(200).json({
                success:true,
                message:"User Loggged In Succesfully ",
                token,  // token pass kele 
                user   // DB madhun user cha data kadhla hota  to user tyat apan token add kelela ahe 
            });

        }else{
            return res.status(401).json({
                success:true,
                message:"passsword is Incorrect "
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login failure !! Please Try again later"
        })
    } 
};

// OTP handler --> 
exports.sendOTP = async(req,res)=>{
   try {
     // fetch email from req body
     const {email} = req.body;

     // check if user already exist
    // Find user with provided email
     const checkUserPresent = await User.findOne({email});
     // user is already exists , then return a response 
     if(checkUserPresent){
         // Return 401 Unauthorized status code with error message
         return res.status(401).json({
             success:false,
             message:"user is already Registered "
         })
     };

     // generate otp 
     // 6--> is no. of otp character/number and in { there is option which we want to take on not }
      var otp = otpGenerator.generate(6,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false
      });

      console.log("OTP is genereted succesfuly -----> ", otp);

      // make sure Otp is unique 
      //check Unique otp or not
      let result = await OTP.findOne({otp:otp});

      // joparyant Unique otp generate hot nahi toparyant loop run  kra
      //This is not a good ,  Best logic --> insted of it used library which generate a unique OTP --> this is a BrutForce
      
      while(result){

        otp = otpGenerator.generate(6,{
            upperCaseAlphabets:false,
        });
        result = await OTP.findOne({otp:otp});
      };

      // OTP ki Entry DB madhe save karaychi 
      const otpPayload = {email,otp};

      // create an entry for OTP in DB 
      const otpBody = await OTP.create(otpPayload);
      console.log("The Unique OTP is save in DB ", otpBody);

      res.status(200).json({
        success:true,
        message:"OTP send Succesfully",
        otp:otpBody.otp
      });
      

   } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            error:error.message,
            message:"Issue in OTP Generation "
        })
   }
};
 
//Cotroller For change Password --> H.W
exports.changePassword = async (req, res) => {
    try {
        console.log("Entering Change Password Controller");

        // Check if req.user exists
        if (!req.user || !req.user.id) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User not found",
            });
        }

        // it get from Token which i send in every request
        const userId = req.user.id;

        console.log("User ID:", userId);

        // Get user details
        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Extract passwords from request body
        const { oldPassword, newPassword } = req.body;

        // Validate input fields
        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Please fill in all required fields",
            });
        }

        // Compare current password with the hashed password in DB
        const isPasswordMatch = await bcrypt.compare(oldPassword, userDetails.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Your Previous Password is Not matching with Current Password  ",
            });
        }

        // Hash the new password before updating
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        userDetails.password = hashedNewPassword;

        await userDetails.save(); // Save updated password to DB 

        console.log("Password updated successfully");

        // send mail    
        // Send password to user for your Password is  updated on  email
        try {
            await mailSender(
                userDetails.email,
                "Password Changed Successfully",
                passwordUpdated(
                    userDetails.email,
                    `Password updated successfully for ${userDetails.firstName} ${userDetails.lastName}`
                )
            );
            console.log("Password change email sent successfully");
        } catch (emailError) {
            console.error("Error sending password change email:", emailError);
        }

        // Return success response
        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        console.error("Error changing password:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while changing the password",
            error: error.message,
        });
    }
};


