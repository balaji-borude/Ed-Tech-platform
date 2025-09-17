const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

const {convertSecondsToDuration} = require('../utils/secToDuration')
const CourseProgress = require('../models/CourseProgress')
//update profile 
exports.updateProfile = async(req,res) =>{
    try {
       // data fetch from body  --> data nahi takla tr default empty send kela 
       const{gender,dateOfBirth="",about = "",contactNumber} = req.body;
       
       // get user Id --> token madhe User id send keleli ahe tyatun baher kadhli 
       const id = req.user.id;
       console.log("Printing Id in Profile-->",id)

       // validation 
        if( !gender || !dateOfBirth || !about || !contactNumber){
            return res.status(400).json({
                success:false,
                message:"Please fill all the deatils "
            })
        };
   
       /* User madhe Additionall detail navachi field add keleli ahe tila -->  Profile  ase nav dile , aplyala User model madhun Tya Profile(additionaldetails) field(model) chi Id find karaychi ani tya Id wr aplya req.body madhun ghetlela data update karaycha ahe */  

       const userDetail = await User.findById(id);
       console.log("User detail find keli -->", userDetail)

        const profileId = userDetail.additionalDetails; // profile chi Id find keli ahe 
        console.log("user madun Profile chi Id kadli -->",profileId);

        //  find the Profile 
        const profileDetails = await Profile.findById(profileId);

       //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender = gender;
        profileDetails.contactNumber=contactNumber;

        await profileDetails.save(); 

        // Db madhe entry save karayche 2 ways ahe tyaty (1) object nahi banvayche an .create() function use karun entry create keli ahe 
        //(2) object create karun ghetle ahe -->  "await objectName.save()"  method use karun DB madhe Entry create keli ahe 
        // yethe 2 way use zala ahe 


       // reurn response
       return res.status(200).json({
        success:true,
        message:"Profile Updated SuccessFully",
        profileDetails,
          
       })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"error occur in Profile updation "
        })
    }
};

// delete account handler 
exports.deleteAccount = async(req,res)=>{
    try { 
      console.log("enterring in delete account");
      console.log("req.user:", req.user);

        // account delete sati acc chi  id lagel --> ti Id find keli ahe 
        const { id } = req.user;  // ✅ Ensure `id` is extracted
        console.log("Getting User ID in backend:", id);
       // console.log("getting User id backend",email)

        //validation --> (id check sathi Db call karaycha ki user present ahe ka nahi and Db madhe )
        const user = await User.findById({_id:id});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"user Not Found "
            })
        };

   // TODO :=> unEnroll user From All enrolled Courses 
   // TODO :=> how can we schedule deltion of accounnt  --> In big company whenever we click on delete account it does not directly deleted it delete after some 4 to 5 day ==> how can we apply this 

   //............... what is -->  CRON job   ---> find / search ................................................

        // use madhe profile pn asel tyla delete kr 
        await Profile.findByIdAndDelete({_id:user.additionalDetails});

        // YETHE kontya variable madhe store kela nahi ki konta data delete hote he jevhaa use karayche tevha aplyala kahi garaj naste ki konta data delete hotoy 
        // 1. Use await Profile.findByIdAndDelete(...) (without storing) when you just need to delete the record.
        // 2.  Use const deleteAcc = await Profile.findByIdAndDelete(...) if you need to verify if deletion was successful or log the deleted document.

        // delete user 
        //await User.findByIdAndDelete({_id:id});
        await User.findByIdAndDelete(id); // ✅ Corrected

     
        // send success response 
        return res.status(200).json({
            success:true,
         message:"user deleted succesfully"
        });


    } catch (error) {
        console.log(error);
	    	res.status(500).json({ 
            success: false, 
            message: "Error occured !! User Cannot be deleted " });
    }
};

//AAdditional 
// get user detail 
exports.getAllUserDetails = async(req,res)=>{

    try {
    
        // get id --> Hi id login kartanna token madhe takli hoti --> ani te token user madhe send kela hota 
        const id = req.user.id; 
        console.log("Printing Get all detail id -->", id)

        // validation and get user detail 
        const userDetails = await User.findById(id);
        await userDetails.populate('additionalDetails');   //.execPopulate(); this is Depriciated mongoose 6+
    
        console.log("userDeils printing-->", userDetails);

        if(!userDetails){
          return res.status(400).json({
            success:false,
            message:"Data not found on this id "
          })
        }

        // aplyala userDetail madhe sarv detail nahi bhetaych i jase ki gender,dateOfBirtt, about , phone number --> ya  field sathi additional deatal nava che ek field ahe User model chya model madhe tyla Populate keaya and Query .execu() method use karun execute krt ahe 

        // return response 
        return res.status(200).json({
           success:true,
           data:userDetails,
           message:"User data fetched succesfully" 
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
            //message:"something went wrong while fetching All user data "
        })
    }
};

exports.updateDisplayPicture = async (req, res) => {
    try {
      console.log("entering the profile update section")
      const displayPicture = req.files.displayPicture;
       
      const userId = req.user.id;
      console.log("userd id ", userId);
      
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  

// check this route --> after payment Integration 
// exports.getEnrolledCourses = async (req, res) => {
//     try {
//       const userId = req.user.id;

//       const userDetails = await User.findOne({
//         _id: userId,
//       })
//       .populate("courses")
//       .exec();


//       if (!userDetails) {
//         return res.status(400).json({
//           success: false,
//           message: `Could not find user with id: ${userId}`,
//         })
//       };

//       return res.status(200).json({
//         success: true,
//         data: userDetails.courses,
//       });

      
//     } catch (error) {
//       return res.status(500).json({
//         success: false,
//         message: error.message,
//       })
//     }
// };

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent", // populate sections
          populate: {
            path: "subSection",  // populate subsections inside sections
          },
        },
      })
      .exec();


      // for Progress bar 
      		// This section is for upadating the coursProgress section in enrolled courses
	  // userDetails = userDetails.toObject()
	  // var SubsectionLength = 0
	  // for (var i = 0; i < userDetails.courses.length; i++) {
		// let totalDurationInSeconds = 0
		// SubsectionLength = 0
		// for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
		//   totalDurationInSeconds += userDetails.courses[i].courseContent[
		// 	j
		//   ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
		//   userDetails.courses[i].totalDuration = convertSecondsToDuration(
		// 	totalDurationInSeconds
		//   )
		//   SubsectionLength +=
		// 	userDetails.courses[i].courseContent[j].subSection.length
		// }
		// let courseProgressCount = await CourseProgress.findOne({
		//   courseID: userDetails.courses[i]._id,
		//   userId: userId,
		// })
		// courseProgressCount = courseProgressCount?.completedVideos.length
		// if (SubsectionLength === 0) {
		//   userDetails.courses[i].progressPercentage = 100
		// } else {
		//   // To make it up to 2 decimal point
		//   const multiplier = Math.pow(10, 2)
		//   userDetails.courses[i].progressPercentage =
		// 	Math.round(
		// 	  (courseProgressCount / SubsectionLength) * 100 * multiplier
		// 	) / multiplier
		// }
	  // }

    // This section is for updating the courseProgress section in enrolled courses
userDetails = userDetails.toObject()
var SubsectionLength = 0

for (var i = 0; i < userDetails.courses.length; i++) {
  let totalDurationInSeconds = 0
  SubsectionLength = 0

  // Loop through courseContent
  for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
    totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
      (acc, curr) => acc + parseInt(curr.timeDuration),
      0
    )

    // Save total duration in hh:mm:ss
    userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    // Count total subsections
    SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
  }

  // Fetch course progress for this user/course
  const courseProgress = await CourseProgress.findOne({
    courseId: userDetails.courses[i]._id,
    userId: userId,
  })

  // Count completed videos safely
  const courseProgressCount = courseProgress?.completedVideos?.length || 0

  // Calculate progress %
  if (SubsectionLength === 0) {
    userDetails.courses[i].progressPercentage = 100
  } else {
    const multiplier = Math.pow(10, 2) // 2 decimal precision
    userDetails.courses[i].progressPercentage =
      Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) /
      multiplier
  }
}









    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      });
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// userDashboard sathi controler banvat ahe 
exports.instructorDashboard = async(req,res)=>{
  try {

    const  id = req.user.id;
    console.log("Printing Id from req.user for instructor Dashboard==>",id)
    //course cha data
    const courseDetails = await Course.find({instructor:id});

    console.log("Instructor Dahbsorad controller res==>",courseDetails);

    const courseData = courseDetails.map((course)=>{
      const totalStudentEnrolled = course.studentEnrolled.length;
      const totalAmountGenerated = totalStudentEnrolled * course.price;

      // create the a new additional field 
      const courseDetailsStats = {
        _id:course._id,
        courseName:course.courseName,
        totalStudentEnrolled,
        totalAmountGenerated
      }

      return courseDetailsStats
    })

    res.status(200).json({
      success:true,
      message:"Instructor Dashboard data fetched succesfully",  
      courses:courseData
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:"Internal Server Error "
    })
  } 
} 