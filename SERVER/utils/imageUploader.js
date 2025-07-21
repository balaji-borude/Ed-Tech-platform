const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file,folder,height,quality) => {

    const options = {folder}; // option madhe folder la thevave lagte
    // jr height dileli asel tr height option madhe yeil --> quality dileli asel tr quality yeil  
    if(height){
        options.height = height;
    };

    if(quality){
        options.quality = quality;
    };
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath,options);


}
