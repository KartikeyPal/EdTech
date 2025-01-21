const cloudinary = require('cloudinary').v2;

exports.cloudinaryConnect=()=>{
    try {
        cloudinary.config({
            cloud_name:process.env.CLOUD_NAME,
            api_key:process.env.API_KEY,
            api_secret:process.env.API_SECRET,
        })
        console.log("cloudinary connection successfull")
    } catch (error) {
        console.error("error in cloudinary",error.message);
        console.log(error);
    }
};