const mongoose= require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName:{
        type:String,
        trim:true,
        required:true
    },
    courseDescription:{
        type:String,
        trim:true,
        required:true
    },
    instructor:{    // User hach Instructor , Admin and Student asu shakto na --> Tyamule instructor madhe User chi Id pass keli ahe 
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },

    whatYouWillLearn:{
        type:String,
    },
  
    courseContent:[    // course madhe multiple section yete mhanun array use kela ani Section che refference dile  
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
       }
    ],
    ratingAndReviews:[  
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"RatingAndReview"
        }
    ],
    price:{
        type:Number,
        required:true,

    },
    thumbnail:{
        type:String,
        required:true
    },

    tag: {
		type: [String],
		required: true,
	},

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    studentEnrolled:[
        {
                type:mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true
        }
    ],
      instructions: {
    type: [String],
  },
    status: {
		type: String,
		enum: ["Draft", "Published"],
        default:["Draft"]
	},
     createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", courseSchema)