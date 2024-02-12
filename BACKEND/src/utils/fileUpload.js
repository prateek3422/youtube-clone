import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryUpload = async (localFilPath) => {
  try {
    if (!localFilPath) return null;

    const response = await cloudinary.uploader.upload(localFilPath, {
      resource_type: "auto",
    });
    // console.log(' file is  uploaded on cloudinary', response)
    fs.unlinkSync(localFilPath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilPath);
  }
};

const clouldinaryDelete = async (fileUrl) =>{
    try {
        if(!fileUrl?.trim()) return

        // console.log(fileUrl)
        // const public_id = fileUrl.split("/").pop().split(".")[0]
    
        // console.log(public_id)

        const response = await cloudinary.uploader.destroy(fileUrl,{
          resource_type:"image"
        })

        console.log(response)

        if(response.result  == "ok"){
            console.log('File deleted successfully.');
        }else{
            console.error('Failed to delete the File.');
        }
    } catch (error) {
        console.log(error)
    }

}

export { cloudinaryUpload, clouldinaryDelete };
