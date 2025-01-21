import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: 'https://cdn.mos.cms.futurecdn.net/7auVjCELrhFKTPfudXRTgc-1200-80.jpg'
    },
    channels: Array
})

const userModel = mongoose.model('users', userSchema);

export default userModel;