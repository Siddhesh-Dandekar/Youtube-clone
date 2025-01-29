import userModel from "../Model/user.model.js";
import videoModel from "../Model/video.model.js";

export async function uploadvideo(req, res){
    const { title, thumbnailUrl, description, videoUrl } = req.body;
    const { _id } = req.user;
    try{
        const UserDetails = await userModel.findById(_id);
        if(!UserDetails.channelId){
            throw new Error('Channel Not Created');
        }
        const newVideo = new videoModel({
            title : title,
            thumbnailUrl : thumbnailUrl,
            videoUrl : videoUrl,
            userId: _id,
            description : description,
            channelId : UserDetails.channelId
        })

        const savedVideo = await newVideo.save();
        return res.send(savedVideo)

    }
    catch(err){
        return res.json({message : err.message})
    }
}

export async function fetchVideos(req, res){
    try{
        const videos = await videoModel.find();
        return res.send(videos);
    }
    catch(err){
        return res.json({message : err.message})
    }
}

export async function fetchVideoById(req, res){
    const { id } = req.params;
    try{
        const videoData = await videoModel.findById(id);
        return res.send(videoData);
    }
    catch(err){
        return res.json({message : err.message})
    }
}