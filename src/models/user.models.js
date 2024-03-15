import mongoose,{Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
            index:true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
        },
        password: {
            type: String,
            required: true,
            min: [8, 'Must be at least 8, got {VALUE}'],
            max: 12,
        },
        fullName: {
            type: String,
            required: true,
            trim:true,
            index:true
        },
        avatar: {
        type: String,
        required: true,
        },
        coverImage:{
            type: String
        },
        watchHistory:{
            type:Schema.Types.ObjectId,
            ref:'Video'
        },
        refreshToken:{
            type: String
        },
    },
    {
        timestamps:true
    }
)
userSchema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(user.password, salt);
    }
    next();
})

userSchema.methods.generateAuthToken = async function(password){
    //return await bcryptjs.compare(password,this.password); //we also write this type no worrying
    const user = this;
    const token = jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    user.refreshToken = token;
    await user.save();
    return token;
}
userSchema.method.generateAuthToken = function(){
    return jwt.sign({_id: this._id,
    email:this.email,
    username:this.username,
    fullName:this.fullName,
    avatar:this.avatar,
    coverImage:this.coverImage,
    watchHistory:this.watchHistory,
    refresh
    },
    process.env.Access_Token_Secret,
    {
        expiresIn: process.env.Access_Token_Expiry
    }
    )
}
userSchema.method.generateRefreshToken = function(){}

export const User = mongoose.model('User',userSchema);