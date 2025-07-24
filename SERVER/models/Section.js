// const mongoose = require("mongoose");
// const SubSection = require("./SubSection");

// const SectionShema = new mongoose.Schema({
//     sectionName:{
//         type:String,
//     },
//     subSection:{
//             type : mongoose.Schema.Types.ObjectId,
//             trim:true,
//             ref:"SubSection"
//     }

   
// });

// module.exports = new mongoose.model("Section", SectionShema);


const mongoose = require("mongoose");

const SectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  subSection: [  // <- lowercase 's' and pass array of ObjectIds --> array should store all the subsection in it 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubSection",
    }
  ]
});

module.exports = mongoose.model("Section", SectionSchema);
