import { createChannel , fetchChannel} from "../Controller/channel.controller.js";
import VerifyToken from "../Middleware/verifytoken.js";


function ChannelRoutes(app){
    app.get('/channels');
    app.get('/channel/:id', fetchChannel);
    app.post('/channel',VerifyToken, createChannel);
}

export default ChannelRoutes;