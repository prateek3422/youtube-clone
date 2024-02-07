import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs'


cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});


 const cloudinaryUpload = async (localFilPath )=>{
    try {
        if(!localFilPath) return null

       const response = await cloudinary.uploader.upload(localFilPath,{
            resource_type:'auto'
        })
        // console.log(' file is  uploaded on cloudinary', response.url)
        fs.unlink(localFilPath)
        return response
    } catch (error) {

        fs.unlinkSync(localFilPath)
    }
 }




 export {cloudinaryUpload}

