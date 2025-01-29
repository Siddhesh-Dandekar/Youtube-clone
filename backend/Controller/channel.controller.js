import channelModel from "../Model/channel.model.js";
import userModel from '../Model/user.model.js'

export async function createChannel(req, res) {
    try {
        const { channelName, description, channelProfile } = req.body;
        const { _id } = req.user;
        const ExistingChannel = await userModel.findById(_id);
        if (ExistingChannel.channelId) {
            throw new Error("Channel Already Exists");
        }
        else {
            const newChannel = new channelModel({
                channelName: channelName,
                userId: _id,
                description: description,
                channelProfile: channelProfile
            })

            const savedchannel = await newChannel.save();
            const updateUser = await userModel.findOneAndUpdate({ _id: savedchannel.userId }, { channelId: savedchannel._id })
            return res.json(updateUser)
        }

    }
    catch (err) {
        return res.json({ error: true, message: err.message })
    }

}

export async function fetchChannel(req, res){
    const channelId = req.params.id;
    try {
        const channelInfo = await channelModel.findById(channelId);
        return res.json(channelInfo);
    }
    catch(err){
        return res.json({message : err.message});
    }
}