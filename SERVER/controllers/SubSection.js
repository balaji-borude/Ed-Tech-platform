const Section = require("../models/Section"); // section madhe subsection chi ID store keleli ahe tyamule --> section la import kele

const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

// create section
exports.createSubSection = async (req, res) => {
  try {
    // fetch the data from req.body
    const { sectionId, title, description } = req.body;

    //extract file for video input
    const video = req.files.videofile;
    //const video = req.files.video;


    //validation
    if (!sectionId || !title ||  !description) {
      return res.status(400).json({
        success: false,
        message: "All field are Required",
      });
    }
    // upload video to cloudinary
    const Uploadetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    // create subsection and strore the SecureUrl of video in DB

    const subSectionDetail = await SubSection.create({
      title: title,
      description: description,
      videoUrl: Uploadetails.secure_url,
    });

    // Update section with subsection Id
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          SubSection: subSectionDetail._id,
        },
      },
      { new: true }
    );
    // section madhe subSection cha data ksa stored hoil --> id chya form madhe ;
    //  jr aplyla Id chya form madhe nahi pahije asel tevha .populate --> use karayche  ----> H.W

    // H>W ==>log Updated section here, after populate query

    //response true
    return res.status(200).json({
      success: true,
      message: "Subsection Created Succesfully",
      data: updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in Subsection created",
    });
  }
};

// H.W==> UPDATE SUBSECTION

// create Upadate Subsection
// exports.updateSubSection = async (req, res) => {
//   try {
//     // fetch data
//     const { title, timeDuration, description, videoUrl, SubSectionId } = req.body;

//     //validation
//     if (!title || !timeDuration || !description || !videoUrl) {
//       return res.status(400).json({
//         success: false,
//         messag: "All Field are required",
//       });
//     }

//     // update section

//     const updateSubSection = await SubSection.findByIdAndUpdate(
//       SubSectionId,
//       {
//         title,
//         timeDuration,
//         description,
//         videoUrl,
//       },
//       { new: true }
//     );

//     // return res
//     return res.status(200).json({
//       success: true,
//       message: "Section Updated succesfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error occur During Updating Subsection",
//     });
//   }
// };

// H.W -- > create Delete subsection
// exports.deleteSubSection = async (req, res) => {
//   try {
//     // delete sathi subsection chi Id lagel --> ti apan url madhun kadli
//     const { SubSectionId } = req.params;

//     // delete subsection
//     const subSection = await SubSection.findByIdAndDelete(SubSectionId);

//     return res.status(200).json({
//       success: true,
//       message: "SubSection Deleted succesfully",
//     });
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error occur During Deleting Subsection",
//     });
//   }
// };



  exports.updateSubSection = async (req, res) => {
    try {
      const { sectionId,subSectionId, title, description } = req.body
      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      const updatedSection = await Section.findById(sectionId).populate("subSection")


      return res.json({
        success: true,
        data:updatedSection,
        message: "Section updated successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }
  
  exports.deleteSubSection = async (req, res) => {
    try {
      const { subSectionId, sectionId } = req.body
      await Section.findByIdAndUpdate(
        { _id: sectionId },
        {
          $pull: {
            subSection: subSectionId,
          },
        }
      )
      const subSection = await SubSection.findByIdAndDelete({ _id: subSectionId })
  
      if (!subSection) {
        return res
          .status(404)
          .json({ success: false, message: "SubSection not found" })
      }

      const updatedSection = await Section.findById(sectionId).populate("subSection")
  
      return res.json({
        success: true,
        data:updatedSection,
        message: "SubSection deleted successfully",
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while deleting the SubSection",
      })
    }
  }