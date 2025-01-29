import mongoose from 'mongoose';

const channelSchema = mongoose.Schema({
    channelName : {
        type: String,
        required: true,
        unique : true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        required: true,
        unique : true
    },
    description: {
        type : String,
        default : "More about this channel...",
    },
    channelProfile:{
        type: String,
        required:false,
        default : "https://yt3.ggpht.com/RAnCvom2Cnxn5g5xe1Vz5T4S9167TWv18cz2MTUu1hXv_tNZ-h2b34RoWPQqtAhvwXdgDijE=s108-c-k-c0x00ffffff-no-rj" 
    },
    channelBanner: {
        type: String,
        default: "https://i.redd.it/vjppkzbfg4ob1.png"
    },
    subscribers: {
        type: Number,
        default : 0
    },
    videos: {
        type : Array,
        default : []
    }
},{timestamps: true})

const channelModel = mongoose.model('channels',channelSchema);

export default channelModel;