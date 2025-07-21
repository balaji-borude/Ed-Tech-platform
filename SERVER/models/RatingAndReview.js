const mongoose= require("mongoose");

const ratingAndReviewsSchema = new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,    // konta user Rating det ahe tyachi ID store keli ahe 
        Ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true,
    },
    review:{
        type:String,
        required:true,
        trim:true
    },
    // kontya course sathi ahe rating and review tyasathi 
    course: {  
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
})
module.exports = mongoose.model("RatingAndReview", ratingAndReviewsSchema)