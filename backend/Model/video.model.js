import mongoose from 'mongoose';

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required : true,
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
        type : String,
        required : true
    },
    uploader:{
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
            userid:String,
            text: String,
            timestamp : String
        }
    ]
})

const videoModel = mongoose.model('videos', videoSchema);

export default videoModel;