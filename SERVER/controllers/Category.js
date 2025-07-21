const Category  = require("../models/Category")

// create tag/category 
exports.createCategory  = async (req,res) => {
    try {
        // fetch data
        const{name, description} =req.body;

        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"All field is required"
            })
        }; 

        // create Entry in Db 
        const categoryDetail = await Category.create({
            name:name,
            description:description
        })
        console.log("create a category --> categoryDetail---> ", categoryDetail);

        //response
        return res.status(200).json({
            success:true,
            message:"category created succesfully"
        });
        
    } catch (error) {
        console.log("error in category creation ",error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }    
};

// get All Category 
exports.showAllCategories = async(req,res)=>{
    try {
        // get all tags
        // aplya kade specific kahi nahi je fetch karayche ahe mhanun {} --> empty pass kela ahe andi tyapudhe jo syntax lihila to purn DB madhe Shodhto (find karto)
        // DB madhe Ji entry jyat name and description asel tr all entry gheun yee  
        const showAllCategory = await Category.find(
                                                    {},

                                                    {
                                                            name:true,
                                                            description:true
                                                    }
                                                );
        res.status(200).json({
            success:true,
            message:"Succesfully all category is shown below -->  ",
            showAllCategory
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
};

//
exports.categoryPageDetails = async(req,res)=>{
    try {
        const {categoryId} = req.body;

        // DB madhe chcek kelya ki ya-Id chya courses kiti ahe  
        // get course for specified category 
        const selectedCategory = await Category.findById(categoryId)
        .populate("courses")
        .exec();  // query la execute karnysathi wapartat 

        // handle the case where category is not found 
        if(!selectedCategory){
            return res.status(404).json({
                success:false,
                message:"category Not Found "
            })
        };

        // handle the case Where there is no courses 
        if(selectedCategory.courses.length == 0 ){
            console.log("No course found for this selected Category ");
            return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
        };

        // dont understand --> check it what is happening here
        const selectedCourses = selectedCategory.courses;

        // Get course for other category 
        const categoriesExceptedSelected = await Category.find({
            _id:{$ne:categoryId} //$ne --> means not equal to category id 
        }).populate("courses");

        let differentCourses =[];
        
        for(const category of categoriesExceptedSelected)
        {
            differentCourses.push(...category.courses);
        }

        // get top-selling courses across all categories 
        const allCourses = allCategories.flatMap((category) => category.courses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

		res.status(200).json({
			selectedCourses: selectedCourses,
			differentCourses: differentCourses,
			mostSellingCourses: mostSellingCourses,
		});
    } catch (error) {
        return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
    }
}