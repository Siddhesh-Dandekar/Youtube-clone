import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required : true,
    },
    videoUrl: {
        type: String, 
        required : true
    },
    thumbnailUrl: {
        type: String, 
        required : true
    },
    description:{
        type: String,
        required : true
    },
    channelId : {
        type: mongoose.Schema.Types.ObjectId, // Change this to ObjectId
        ref: 'channels', // Reference to the `channels` model
        required: true
    },
    userId:{
        type: String,
        requied : true,
    },
    views:{
        type : Number,
        default : 0
    },
    likes:{
        type: Number,
        default : 0
    },
    dislikes:{
        type:Number,
        default: 0
    },
    uploadDate:{
        type : Date,
        default : Date.now   
    },
    comments:[
        {
            userid: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                required: true,
                default: Date.now
            }
        }
    ]
})

const videoModel = mongoose.model('videos', videoSchema);

export default videoModel;