
const jwt = require("jsonwebtoken");
//const User = require("../models/User");
require("dotenv").config();

// authentication middleware
exports.auth = async (req, res, next) => {
    try{
        console.log("Entering in Auth middleware")
        //extract token
        const token = req.cookies.token
            || req.body.token 
            || req.header("Authorization").replace("Bearer ", "");

        // console.log("Printing Token From Auth --> ", token);

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        const JWT_SCERET = process.env.JWT_SCERET;
        console.log("Printing jwtSecret in auth -->",JWT_SCERET);

        try{
            const decode =  jwt.verify(token, JWT_SCERET);
            console.log(decode);
            req.user = decode;    
            // user chya request madhe Token pathavle ====> mahnje pratyek user chya request madhe he token janar --> tyacha fayda as honar ki --> pudhcya konntya hi request user takel tyamadhe token asel ch 
            
            // const payload={
            //     id:user._id,
            //     email:user.email,
            //     accountType:user.accountType
            // };
            // ------------> ha jo data user ne payload madhe store kela ahe na to apan acces karu shakkto 
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();

    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent 
exports.isStudent = async(req,res,next)=>{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for student"
            })
        }

        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified "
        })
    }
}

// isAdmin  
exports.isAdmin = async(req,res,next)=>{
    try {
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Admin"
            })
        }

        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified "
        })
    }
}

// inInstructor
exports.isInstructor = async(req,res,next)=>{
    try {
        console.log("Entering in Is Instructor section ")
        // fetching role from request and checking the role is student  
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a Protected Route for Instructor"
            })
        }
        console.log("existing in Is Instructor section ");
        
        next();  // go to next middleware

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified ! Please try again later  "
        })
    }
}