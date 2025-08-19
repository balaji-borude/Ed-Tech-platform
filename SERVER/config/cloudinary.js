const cloudinary = require("cloudinary").v2; //! Cloudinary is being required

exports.cloudinaryConnect = () => {
	try {
		console.log("Entering the Cloudinary setup -----------------");

		cloudinary.config({
			//!    ########   Configuring the Cloudinary to Upload MEDIA ########
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});

		console.log("Cloudinary connected succesfully ")
	} catch (error) {
		console.log("Error occur While connecting to Cloudinary-->" ,error);
	}
};