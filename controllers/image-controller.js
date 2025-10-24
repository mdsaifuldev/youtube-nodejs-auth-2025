
const Image = require('../models/image');
const {uploadToCloudinary} = require('../helpers/cloudinaryHelpers');
const { cloudinary } = require('../config/cloudinary');

const uploadImageController = async(req, res)=>{
    try{
        // Check if file is missing in request object 
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: "File is required, PLease upload an images"
            });


            
        }

        // upload to cloudinary 

        const {url, publicId} = await uploadToCloudinary(req.file.path);

        // store the image url and public id along with the upload user id with database 
        const newlyUploadedImage = new Image({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: "Images uploaded successfully",
            image: newlyUploadedImage,
        });


         

    }catch(error){
     console.log(error);
     res.status(500).json({
        success: false,
        message: "Something went wrong, Please try again",
        
     })
    }
};


module.exports = {
    uploadImageController,
};