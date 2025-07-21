const Section = require("../models/Section"); // section madhe subsection chi ID store keleli ahe tyamule --> section la import kele 
 
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


// create section
exports.createSubSection = async(req,res)=>{
    try {
        // fetch the data from req.body
        const{sectionId,title,timeDuration,description} = req.body;

        //extract file for video input 
        const video = req.files.videofile;

        //validation 
        if(!sectionId || !title || !timeDuration || !description){
            return res.status(400).json({
                success:false,
                message:"All field are Required"
            })
        }
        // upload video to cloudinary 
        const Uploadetails = await uploadImageToCloudinary(video,process.env.FOLDER_NAME);
        
        // create subsection and strore the SecureUrl of video in DB 

        const subSectionDetail = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:Uploadetails.secure_url
        });

        // Update section with subsection Id 
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
            {
                $push:{
                    SubSection:subSectionDetail._id,
                }
            },
            {new:true}
        );
        // section madhe subSection cha data ksa stored hoil --> id chya form madhe ;
        //  jr aplyla Id chya form madhe nahi pahije asel tevha .populate --> use karayche  ----> H.W

        // H>W ==>log Updated section here, after populate query 

        //response true
        return res.status(200).json({
            success:true,
            message:"Subsection Created Succesfully"
        });


    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error in Subsection created"
        })
    }
};

// H.W==> UPDATE SUBSECTION 

// create Upadate Subsection
exports.updateSubSection = async(req,res)=>{
    try {
        // fetch data 
        const{title,timeDuration,description,videoUrl,SubSectionId}= req.body;

        //validation
        if(!title || !timeDuration || !description || !videoUrl){
            return res.status(400).json({
                success:false,
                messag:"All Field are required"
            })
        };

        // update section

        const updateSubSection = await SubSection.findByIdAndUpdate(SubSectionId,
                                                                {
                                                                    title,
                                                                    timeDuration,
                                                                    description,
                                                                    videoUrl
                                                                },
                                                                {new:true}
                                                             );

           // return res
        return res.status(200).json({
            success:true,
            message:"Section Updated succesfully"
        })                                                   

        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occur During Updating Subsection"
        })
    }
};

// H.W -- > create Delete subsection
 exports.deleteSubSection = async(req,res)=>{
    try {
        // delete sathi subsection chi Id lagel --> ti apan url madhun kadli
        const{SubSectionId} = req.params;

        // delete subsection
        const subSection = await SubSection.findByIdAndDelete(SubSectionId)
        
        // response 
           // return res
           return res.status(200).json({
            success:true,
          message:"Section Deleted succesfully"
      })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error occur During Deleting Subsection"
        })
    }
};
