import { asyncHandler} from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError.js"
import   {User, user} from "../models/user.models.js"
import {uploadOnCloudinary}from "..utils/uploadOnCloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async(req,res) => {
    //get user information
    //validation non empty
    //check if user already exists
    //check for image,check for avatar
    //upload them to cloudinary server,avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return response
    res.status(200).json({
        message:"success"

})
const {fullName,email,username,password} = req.query
console.log("email:" + email);

// if(fullName === ""){
//     throw new ApiError(400,"full name is required")
// }
 if(
    [fullName,email,username,password].some((field) => field?.trim() === "")
 ){
    throw new ApiError(400,"all fields must be required")
 }

 const existedUser = User.findOne({$or: [{fullName}, {email} , {username},{password}]

})
if(existedUser) {
   throw new ApiError(400,"user already exists")}
const avatarLocalPath = req.files?.avatar[0]?.path;
const coverImageLocalPath = req.files?.coverImage[0]?.path;
if(!avatarLocalPath){
   throw new ApiError(400,"Avatar file is required")
}
const avatar = await uploadOnCloudinary(avatarLocalPath)
const coverImage = await uploadOnCloudinary(coverImageLocalPath)

if(!avatar){
    throw new ApiError(400,"Avatar upload failed")
}
//create an object and entry on db
const user = await User.create({
   fullName,
   avatar:avatar.url,
   coverImage:coverImage?.url || "", // here we check if user not get any image then we first check
   email,
   password,
   username:username.toLowerCase()

})
const createdUser = await User.filndById(user._id).select("-password -refreshToken")
if(!createdUser){
    throw new ApiError(500,"user creation failed")
}

res.status(200).json(
    new ApiResponse(200, createdUser, "User created successfully")
)
})

export {registerUser,}