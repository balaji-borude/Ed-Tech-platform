const Category = require("../models/Category");
const { Mongoose } = require("mongoose");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// create tag/category
exports.createCategory = async (req, res) => {
  try {
    // fetch data
    const { name, description } = req.body;

    // validation
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All field is required",
      });
    }

    // create Entry in Db
    const categoryDetail = await Category.create({
      name: name,
      description: description,
    });
    console.log("create a category --> categoryDetail---> ", categoryDetail);

    //response
    return res.status(200).json({
      success: true,
      message: "category created succesfully",
    });
  } catch (error) {
    console.log("error in category creation ", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get All Category
exports.showAllCategories = async (req, res) => {
  try {
    // get all tags
    // aplya kade specific kahi nahi je fetch karayche ahe mhanun {} --> empty pass kela ahe andi tyapudhe jo syntax lihila to purn DB madhe Shodhto (find karto)
    // DB madhe Ji entry jyat name and description asel tr all entry gheun yee
    const showAllCategory = await Category.find(
      {},

      {
        name: true,
        description: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Succesfully all category is shown below ",
      data:showAllCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//HW- get top courses sathi pagedetails 
exports.categoryPageDetails = async (req, res) => {
    try {
      const { categoryId } = req.body;
      console.log("PRINTING CATEGORY ID: ", categoryId);
      // Get courses for the specified category
      const selectedCategory = await Category.findById(categoryId)
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: "ratingAndReviews",
        })
        .exec()
  
      //console.log("SELECTED COURSE", selectedCategory)
      // Handle the case when the category is not found
      if (!selectedCategory) {
        console.log("Category not found.")
        return res
          .status(404)
          .json({ success: false, message: "Category not found" })
      }
      // Handle the case when there are no courses
      if (selectedCategory.courses.length === 0) {
        console.log("No courses found for the selected category.")
        return res.status(404).json({
          success: false,
          message: "No courses found for the selected category.",
        })
      }
  
      // Get courses for other categories
      const categoriesExceptSelected = await Category.find({
        _id: { $ne: categoryId },
      })
      let differentCategory = await Category.findOne(
        categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
          ._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
        })
        .exec()
        //console.log("Different COURSE", differentCategory)
      // Get top-selling courses across all categories
      const allCategories = await Category.find()
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
        },
        })
        .exec();


        // Top courses 
      const allCourses = allCategories.flatMap((category) => category.courses)
      const mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10)
       // console.log("mostSellingCourses COURSE", mostSellingCourses)
      res.status(200).json({
        success: true,
        data: {
          selectedCategory,
          differentCategory,
          mostSellingCourses,
        },
      });
      
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
  }
