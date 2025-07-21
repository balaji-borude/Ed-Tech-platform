

// razorpay cha instace ghetla 
const{instance}= require("../config/razorpay");
const Course = require("../models/Course");
const mongoose = require("mongoose");// user_id string madhun --> object ID madhe convert karayche ahe tyamule moongose cha instance aplyala pahije 

const User = require("../models/User");
const mailSender = require("../utils/mailSender");

// import karayche baki ahe 
const {CourseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
//const { default: mongoose } = require("mongoose");

// capture payment and initiate the razorpay 
exports.capturePayment = async(req , res) =>{
    
        // get course Id and User Id 
        const {course_id} = req.body;
        const userId = req.user.id;   
        // validation 
        // valid course Id 
        if(!course_id){
            return res.json({
                success:false,
                message:"Please Provide valid Course Id "
            });
        };

        // valid courseDetail --> aplyala wari dilelya CourseId aplyakade DB madhe ahe ka tyasathi DB interacation keli ahe
        let course; 
        try {
            course = await Course.findById(course_id);

           // if DB don't have data of that Id means there is no courses having this course_id --> then return this response 

            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find course "
                })
            };

            // check if user already pay for this course --> same user same couser buy kartoy ka te check karnysathi use kelay ;

            // user id course chya model madhe Object id chya form amdhe ahe.

            //user_id string madhun --> object ID madhe convert karayche ahe 
            const uid = new mongoose.Types.ObjectId(userId,String);
            if(course.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"student is already Enrolled cant buy same course "
                })
            };

            // return res.status(200).json({
            //     success:true,
            //     message:"Registration succesfully "
            // })


        } catch (error) {
            console.log("error in capture payment ", error);

            return res.status(500).json({
                success:false,
                message:"Error in capture payment "
            })
        }
    
        // create order
        const amount = course.price;
        const currency = "INR";

        const options ={
            amount:amount*100,
            currency,
            receipt:Math.random(Date.now()).toString(),
            notes:{
                course_id:course_id,
                userId
            }
        };

        // function call to create order 
        try {
            // Initiate  the Payment using razorpay   

            const paymentResponse = await instace.orders.create(options);
            console.log(paymentResponse);

            return res.status(200).json({
                success:true,
                message:"payment creation is done here ",
                courseName:course.courseName,
                courseDescription:course.courseDescription,
                thumbnail: course.thumbnail,
                orderId: paymentResponse.id,
                currency:paymentResponse.currency,
                amount:paymentResponse.amount
            })

        } catch (error) {
            console.log(error);
            res.json({
                success:false,
                message:"could not initiate the order",
            });
        }

        // response 

};

// verify signature of razorpay and server
exports.verifySignature = async (req,res) => {

    // this secret is present in server as well as razoarpay which is used to verify the signature from razorpay 
    const webHookSecret = "123456";

    // Razorpay signature from request headers
    const signature = req.headers['x-razorpay-signature'];

   
    const shasum = crypto.createHmac("sha256",webHookSecret);

    // we have to convert HMAC object to String formate
 /*   The webhook request body is converted into a string and passed into the HMAC function.
This step ensures that the exact same hash is generated as Razorpay’s. */
    shasum.update(JSON.stringify(req.body));

    const digest =shasum.digest("hex");

    // verifying our webHookSecret and secret/signature provided by razorpay  
    if (digest === signature) {
        console.log("Webhook request is verified!");
        console.log("Payment is Authorizes ");
        // get courseId and User id from razorpay request --> which we send in notes while capturing payment 

        const{course_id,userId} = req.body.payload.payment.entity.notes;

        try {
            // full fill the action 

            // find the course and  enroll the student in it 
            const enrolledCourse=await Course.findOneAndUpdate(
                            {_id:course_id}, // ya id wr course find kr 
                            {$push:{studentEnrolled:userId}},
                            {new:true}
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"course Not found "
                })
            };
            console.log(enrolledCourse);

            // find the student and add the course in the list of enrolled Corse 
            const enrolledstudent = await User.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:course_id}},
                {new:true}
            );
            console.log("student enrolled in List of enrolled course list ", enrolledstudent);

            // sending confirmation -- mail to student

            // mail madhe email, title, body of main send 
            const emailResponse = await mailSender(
                enrolledstudent.email,
                "Congaratulation on studyNotion", "you ca onboarded into new studyNotion course",

            );

            return res.status(200).json({
                success:true,
                message:"Signature verified after razorpay after razorpay request"
            })

            
        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        };

       
    } else {
        console.log("Webhook verification failed!");
        res.status(400).json({
            success:false,
            message:"Invalid Signature"
        });
    }
    

}