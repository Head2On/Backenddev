import {v2 as cloudinary} from 'cloudinary';
          

cloudinary.config({ 
  cloud_name: 'process.env.Cloudinary_Cloud_Name', 
  api_key: 'Cloudinary_Api_key', 
  api_secret: 'Cloudinary_Api_key_secret' 
});

const uploadOnCloudinary = async (localFilePath) =>
{
  try{
    if(!localFilePath) return null
   // cloudinary.uploader.upload(localFilePath,{
      const response = await cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto"
    })
    //file successfully uploaded
    console.log("file is uploadOnCloudinary:",response.url);
    return response.url;
  }catch (error){
//file not uploaded
    console.log("file is not uploadOnCloudinary:",error);
    FileSystem.unlinkSync(localFilePath)//delete all localFilepath
    return null;
  

}

}


//export default uploadOnCloudinary //ou export a single value (which could be a function, object, class, etc.) as the default export from a module.
export {uploadOnCloudinary}  //With export { ... }, you export named exports, which can include multiple values (functions, objects, etc.) from a module.
