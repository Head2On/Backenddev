import mongoose from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate';

const VideoSchema = new mongoose.Schema(
    {
        ID:{
            type: String,
            required: true,
            unique: true
        },
        thumbnail: {
            type: String,
            required: true
        },
        videoFile:{
            type: String,
            required: true
        },
        thumbnailFile: {
        type: String,
        required: true
        },
        title:{
            type: String,
            required: true,
        },
        description:{
            type: String,

        },
        duration:{
            type: Number,
            required: true
        },
        isPublished:{
            type: Boolean,
            default: true
        },
        views: {
            type: Number,
            default: 0
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
);

VideoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model('Video',userSchema);