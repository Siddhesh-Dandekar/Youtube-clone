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
        default : "",
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