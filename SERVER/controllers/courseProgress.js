/* eslint-disable no-dupe-keys */
// user ne konkontya video complet kele te track krnar ahe ha controller 

// suruwatil user ne course Purchase kela mhanje --> course Progress  0 asel 

const Course = require('../models/Course');
const CourseProgress = require('../models/CourseProgress');
const SubSection = require('../models/SubSection');


exports.updateCourseProgress = async(req,res)=>{
    // l;ecture la completed mark krt ahe te ==> 1. kontya course cha  2. konta user 
    const {courseId,subSectionId} = req.body;

    const userId = req.user.id;

    try {
        //check subsectio is valid 
        const subSection = await SubSection.findById(subSectionId);

        //validation
        if(!subSection){
            return res.status(404).json({
                error:"Invalid SubSection",

            })
        };


        //  ##############################
        // check for old entry of subSection Entry 
        let courseProgress = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        });

        // yasati course Buy kartanna payment 1. order creaet keli 2. payment verify kel 3. courseProgess la 0 set karav lagel 

        // validation 
        if(!courseProgress){
             return res.status(404).json({
                success:false,
                message:"Course Progress does not exist"
            })
        } else{
            // check for reCompleting video / sub section 

            // already completed section or subSection la prt completd as mark as krt ahe ka check krrr ??


            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({
                    error:"SubSection is already completed "
                })
            };

            // if not completed then push to the DB 

            courseProgress.completedVideos.push(subSectionId);
        }    

        await courseProgress.save(); // updated state la db madhe save kel 
            
        res.status(200).json({
            success:true,
            message:"Course Updated succesfully ",
            data:courseProgress
        })


    } catch (error) {
        //console.error(error);
        return res.status(400).json({
            error:"Internaml server Error",
            // message:error,
            error:error 
        })
    }
}