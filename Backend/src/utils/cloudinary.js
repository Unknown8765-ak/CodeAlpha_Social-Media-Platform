import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET,


    });

    console.log(cloudinary.config());

    console.log(process.env.CLOUDINARY_CLOUD_NAME);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.CLOUDINARY_API_SECRET);

const uploadoncloudinary = async (localfilepath)=>{
    console.log(localfilepath);
    try {
        if (!localfilepath) return null
        const response = await cloudinary.uploader.upload(localfilepath ,{
            resource_type : "image"
        })

    //file has been uploaded succesfully
    console.log("file is uploaded on cloudinary",response.url)
        fs.unlinkSync(localfilepath);

        console.log(localfilepath);
console.log(fs.existsSync(localfilepath));
    return {
        url: response.secure_url,
        public_id: response.public_id
    }
    
    } catch (error) {
        console.log(error);
    console.log(error);

    console.log(error.message);
    console.log(error.http_code);
    console.log(error.error);

        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath);
        } //remove the locally saved temporary file as the upload opertaion got failed
        return null;
    }
}

const deleteFromCloudinary = async (public_id) => {
    try {
        if (!public_id) return null;

        return await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        return null;
    }
};


export {
    uploadoncloudinary,
    deleteFromCloudinary
}





