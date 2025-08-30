
// razorpay cha instace ghetla 
const{instance}= require("../config/razorpay");
const Course = require("../models/Course");
const mongoose = require("mongoose");// user_id string madhun --> object ID madhe convert karayche ahe tyamule moongose cha instance aplyala pahije 

const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const crypto = require("crypto");

// Import he mail Template 
const { courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

const {paymentSuccessEmail}= require('../mail/templates/paymentSuccessEmail.js');



// Below controller is used for multiple iteM buying at once 

// Initiaate the razorpay order 
exports.capturePayment=async(req,res)=>{

    const {courses} = req.body; // get the all Id's of all courses -->   here user can buy one or more than one courses 
    const userId = req.user.id; // getting user id from AUTH middleware 

    // console.log("Printing the courses from the req.body from capture payment ",courses );
    // console.log("Print the USERID from auth in capurre payment ", userId);
    // validation for courses id's
    if(courses.length === 0){
        return res.json({
            succss:false,
            message:"Please add the valid Courses ID's "
        })
    };


    // calculate the total amt of all courses 

    let totalAmount =0;

    // pratyek course chi id kadli --> courses maddhun ek,ek course chi Id kadhli ani tyatun price ghenar 
    for(const course_id of courses){

        let course;
        try {
            // console.log("Printing the courseId",course_id);
            
            course = await Course.findById(course_id); // // course_id is string ---> course_id.courseId --> now cousre_id itself having the multiple course Id 
            // console.log("Printing the course from cpture payment ",course);

            if(!course){
                return res.status(401).json({
                    success:false,
                    message:"Could not find course"
                })
            }   
            
            // check if user is already entrolled to this course 

            // check if user already pay for this course --> same user same couser buy kartoy ka te check karnysathi use kelay 
            // user Id string madhun Objectid madhe convert karnyasati --> mongoose cha use krt ahe 
            const uid = new mongoose.Types.ObjectId(userId); // yala convert  kel naste tari kahi problem ala nasta -->Mongoose will automatically cast strings to ObjectId in most queries:

            if(course.studentEnrolled.includes(uid)){
                return res.status(400).json({
                    success:false,
                    message:"student is already Enrolled can't buy same course "
                })
            }

            totalAmount += course.price;

            // console.log("Printing the total amt of all courses ----> ",totalAmount);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
 
    }

    // order create karnysathi Options pahije 
    // option create krt ahe 
    // Curency is not required in the Test API of razorpay --> currenncy:"INR",
        const options ={
            amount: totalAmount*100, // this is a syntax of razorpay of adding RUppes 
            // currenncy:"INR",
            receipt:Math.random(Date.now()).toString()
        }

// verifying wher is the issue 
// console.log("Razorpay Credentials:", process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET);
 console.log("Order Options:", options);


    // Option warun Order create karu 
    try {
        console.log("Entering in order of Payment")
        const paymentResponse = await instance.orders.create(options);
           console.log(" in order of Payment")
        res.json({
            success:true,
            message:paymentResponse,
          
        })
    } catch (error) {
        console.log("ERROR IN INITIATE THE ORDER --> ",error);
        res.status(500).json({
            success:false,
            message:"Could Not Initiate the Order",
               error: error.message, 
        });

    }
};


// verify the payment --> this logic is store in server --> where we only verify the signature --> razorpay kadun signature alay te  ani APAN Je create kel te Match kret ahe ka ==> match hot asel tr te SUCCESFUL payment ahe ==>te je seccess alae trch aple payent purn kelya jail  tyawarun apan course assign karu shakto 

exports.verifyPayment = async(req,res)=>{


    const razorpay_order_id = req.body.razorpay_order_id;

    const razorpay_payment_id = req.body.razorpay_payment_id;

    const razorpay_signature = req.body.razorpay_signature;

    const courses = req.body.courses;

    const userId = req.user.id;


    if(!razorpay_order_id || !razorpay_payment_id|| !razorpay_signature||!courses|| !userId){
        res.status(200).json({
            success:false,
            message:"Payment Failed  All fieldsare required "
        })
    };

    // Thi is the syntax of razorpay to verify the signature
    //  razorpay_order_id + "|" + razorpay_payment_id
    // create the hmac object using crypto 
    // create the body using order id and payment id
    let body = razorpay_order_id + "|" + razorpay_payment_id;

    // threee bekar line 
    const expectedSignature = crypto.createHmac("sha256",process.env.RAZORPAY_SECRET)
                                                                        .update(body.toString())
                                                                        .digest("hex");


    // if expected signature and actual signature match zale ==> success ==> student la enrolled ker 
    if(expectedSignature === razorpay_signature){
        // enroll the student --> call the function 
        await enrollStudent(courses,userId,res);

        // return res
        return res.status(200).json({
            success:true,
            message:"Payment Verified  "
        })
    }
    return res.status(200).json({
        success:false,
        message:"Payment Failed"
    })


};

// enroll the student
const enrollStudent =async(courses,userId,res)=>{
    // validat the data 
    if(!courses||!userId){
        return res.status(400).json({
            success:false,
            message:"Please Provide the data for courses or userId"
        })
    };

    // mere pass multiple course/item ahe  je mi buy krt ahe ==> tr mla pratyek course madhe student la insert  karave lagel --> ki student ne course Buy kela  ahe mhanun  

    for(const courseId of courses){

        try {
         // find the student and enrolled the studnet in that course ---> 
        const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},{$push:{studentEnrolled:userId}},{new:true});

        //$push:{} --> This is a MongoDB update operator that adds (appends) a value into an array field.

        // new true ==> updated response dete 
        if(!enrolledCourse){
            return res.status(500).json({
                succss:false,
                message:"course not found "
            })
        };

        // find the student and add the course to their list of Enrolled Courses 
        // userId na stufent find kela ani tyala course chya Array madhe add kela
        const enrolledStudent = await User.findByIdAndUpdate(userId,{$push:{courses :courseId}},{new:true});


        // send the mail to student who buy the course 
        const emailResponse = await mailSender(
            enrolledStudent.email,
           `Successfully Enroled into ${enrolledCourse.courseName}`,
           courseEnrollmentEmail(enrolledCourse.courseName, `${enrollStudent.firstName && enrolledStudent.lastName}` ) 
        );
        
        console.log("Email send succesfuly to Enrolled student ", emailResponse);
        } catch (error) {
            console.log("error",error);
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }
       

    }
}

// send mail after payment success
exports.sendPaymentSuccessEmail=async(req,res)=>{
    console.log("Entering in the SendPaymentSuccessEmail Controller");
    const {orderId,paymentId,amount} = req.body;

    const userId = req.user.id;

    // validation
    if(!orderId||!paymentId||!amount||!userId){
        return res.status(400).json({
            success:false,message:"Please Provide all the fields"
        })
    };

    // student cha data find karaycha 
    try {
        // find studen 
        const enrolledStudent = await User.findById(userId);

        await mailSender(enrolledStudent.email,
            `Payment  Recieved`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100,orderId,paymentId)

        );
        console.log("Email is send succesfully -->");
        return res.status(200).json({
            success:true,
            message:"Email is send succesfully to student"
        });

    } catch (error) {
        console.log("error in sending mail",error);
        return res.status(500).json({
            success:false,
            message:"could not send email "
        })
    }
}





// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
// This all below controller is user for ======> Single purchase ==> Above we are writing the ==> ciontroller for multiple element buy options 

// ############################################


// capture payment and initiate the razorpay 
// exports.capturePayment = async(req , res) =>{
    
//         // get course Id and User Id 
//         const {course_id} = req.body;
//         const userId = req.user.id;   
//         // validation 
//         // valid course Id 
//         if(!course_id){
//             return res.json({
//                 success:false,
//                 message:"Please Provide valid Course Id "
//             });
//         };

//         // valid courseDetail --> aplyala wari dilelya CourseId aplyakade DB madhe ahe ka tyasathi DB interacation keli ahe
//         let course; 
//         try {
//             course = await Course.findById(course_id);

//            // if DB don't have data of that Id means there is no courses having this course_id --> then return this response 

//             if(!course){
//                 return res.json({
//                     success:false,
//                     message:"Could not find course "
//                 })
//             };

//             // check if user already pay for this course --> same user same couser buy kartoy ka te check karnysathi use kelay ;

//             // user id course chya model madhe Object id chya form amdhe ahe.

//             //user_id string madhun --> object ID madhe convert karayche ahe 
//             const uid = new mongoose.Types.ObjectId(userId,String);
//             if(course.studentEnrolled.includes(uid)){
//                 return res.status(400).json({
//                     success:false,
//                     message:"student is already Enrolled cant buy same course "
//                 })
//             };

//             // return res.status(200).json({
//             //     success:true,
//             //     message:"Registration succesfully "
//             // })


//         } catch (error) {
//             console.log("error in capture payment ", error);

//             return res.status(500).json({
//                 success:false,
//                 message:"Error in capture payment "
//             })
//         }
    
//         // create order
//         const amount = course.price;
//         const currency = "INR";

//         const options ={
//             amount:amount*100,
//             currency,
//             receipt:Math.random(Date.now()).toString(),
//             notes:{
//                 course_id:course_id,
//                 userId
//             }
//         };

//         // function call to create order 
//         try {
//             // Initiate  the Payment using razorpay   

//             const paymentResponse = await instance.orders.create(options);
//             console.log(paymentResponse);

//             return res.status(200).json({
//                 success:true,
//                 message:"payment creation is done here ",
//                 courseName:course.courseName,
//                 courseDescription:course.courseDescription,
//                 thumbnail: course.thumbnail,
//                 orderId: paymentResponse.id,
//                 currency:paymentResponse.currency,
//                 amount:paymentResponse.amount
//             })

//         } catch (error) {
//             console.log(error);
//             res.json({
//                 success:false,
//                 message:"could not initiate the order",
//             });
//         }

//         // response 

// };




// verify signature of razorpay and server
// exports.verifySignature = async (req,res) => {

//     // this secret is present in server as well as razoarpay which is used to verify the signature from razorpay 
//     const webHookSecret = "123456";

//     // Razorpay signature from request headers
//     const signature = req.headers['x-razorpay-signature'];

   
//     const shasum = crypto.createHmac("sha256",webHookSecret);

//     // we have to convert HMAC object to String formate
//  /*   The webhook request body is converted into a string and passed into the HMAC function.
// This step ensures that the exact same hash is generated as Razorpay’s. */
//     shasum.update(JSON.stringify(req.body));

//     const digest =shasum.digest("hex");

//     // verifying our webHookSecret and secret/signature provided by razorpay  
//     if (digest === signature) {
//         console.log("Webhook request is verified!");
//         console.log("Payment is Authorizes ");
//         // get courseId and User id from razorpay request --> which we send in notes while capturing payment 

//         const{course_id,userId} = req.body.payload.payment.entity.notes;

//         try {
//             // full fill the action 

//             // find the course and  enroll the student in it 
//             const enrolledCourse=await Course.findOneAndUpdate(
//                             {_id:course_id}, // ya id wr course find kr 
//                             {$push:{studentEnrolled:userId}},
//                             {new:true}
//             );

//             if(!enrolledCourse){
//                 return res.status(500).json({
//                     success:false,
//                     message:"course Not found "
//                 })
//             };
//             console.log(enrolledCourse);

//             // find the student and add the course in the list of enrolled Corse 
//             const enrolledstudent = await User.findOneAndUpdate(
//                 {_id:userId},
//                 {$push:{courses:course_id}},
//                 {new:true}
//             );
//             console.log("student enrolled in List of enrolled course list ", enrolledstudent);

//             // sending confirmation -- mail to student

//             // mail madhe email, title, body of main send 
//             const emailResponse = await mailSender(
//                 enrolledstudent.email,
//                 "Congaratulation on studyNotion", "you ca onboarded into new studyNotion course",

//             );

//             return res.status(200).json({
//                 success:true,
//                 message:"Signature verified after razorpay after razorpay request"
//             })

            
//         } catch (error) {
//             return res.status(500).json({
//                 success:false,
//                 message:error.message
//             })
//         };

       
//     } else {
//         console.log("Webhook verification failed!");
//         res.status(400).json({
//             success:false,
//             message:"Invalid Signature"
//         });
//     }
    

// }