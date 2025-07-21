const RatingAndReview = require("../models/RatingAndReview");

const Course = require("../models/Course");
const { default: mongoose } = require("mongoose");
//create rating and reviw
exports.RatingAndReview = async(req,res)=>{
    try {
        // get user id 
        const {userId} = req.user.id;  // this Id -->  will be inserted in Auth wala middlware in request 

        // fetch data from user id 
        const{rating,review, courseId}= req.body;

        //check if user is enrolled or not 
        // eka course maadhe gela nani tithe given CourseId cha course find kela --> tya  prateyk  course madhe enrolled student chya user id astya --> hi id tithe ahe ka te check karnysathi second parameter use kelay
        const courseDetails = await Course.findOne(
            {_id:courseId,
            studentEnrolled:{$elematch:{$eq: userId}}
            },
             
        );

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in the course "
            })
        }

        // check if user already reviewd the course 
        const alredyReviewed = await RatingAndReview.findOne({user:userId,
            course:courseId
        });
        
        if(alredyReviewed){
            return res.status(403).json({
                success:false,
                message:'Course is already reveiwed by the user'
            })
        };
        // create raing and review 
        const ratingReviews = await RatingAndReview.create({
            rating,
            review,
            course:courseId,
            user:userId
        });

        // update the course model 
        await Course.findByIdAndUpdate({_id:courseId},
            {
                $push:{
                    ratingAndReviews:ratingReviews._id
                }
            },
            {new:true}
        )
        // return response 

        return res.status(200).json({
            success:true,
            message:"Rating and review Succedfully",
            ratingReviews
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message 
        })
    }
};

// Get average rating
exports.getAverageRating = async(req,res)=>{
    try {
        // get course id 
        const courseId = req.body.courseId;
        // db call and get aggregation 
        // calculate average rating 
        // rating and review collection madhe aggregate function use karun 
        const result = await RatingAndReview.aggregate(
            {
                // aggreagate fuction return array 
                $match:{
                    course:mongoose.Types.ObjectId(courseId)
                },       
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                },
            }
        );

        if(result.length>0){
            res.status(200).json({
                success:true,
                averageRating:result[0].averageRating,

            })
        }
        // if no rating review exist
          return res.status(200).json({
            success:true,
            message:"average"
          })

        // return rating
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

// getAll rating and review
exports.getAllRatingAndReview = async(req,res)=>{
    try {
        // get all rating and review from DB 
        const allReviews = await RatingAndReview.find({})
                                    .sort({rating:"desc"})
                                    .populate({
                                        path:"user",
                                        select:"firstNamelastName email, image"
                                    })
                                    .populate({
                                        path:"course",
                                        select:"courseName"
                                    }).exec();
        // select field -->  mhanje je attribute seleted madhe lihile ahe tech fakt distil populate madhe --> jevha consolee log karu tevha kalel , 
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        }) 
    }
}


// additional:--> H.W
// get all rating and review corresponding to course id 
