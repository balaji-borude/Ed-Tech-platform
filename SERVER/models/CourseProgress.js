const mongoose= require("mongoose");

const courseProgress = new mongoose.Schema({

  courseId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Course"
  },

  completedVideos:[   // student chi Prrogress kiti zali tyala eka Array madhe ghetla ---> yamdhe subSection Chi Id ghetli ahe --> subSection mahnjech --> kiti courese complete zala --> kiti video complete zale 
    
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
  ]
})

module.exports = mongoose.model("CourseProgress",courseProgress)