import { uploadvideo , fetchVideos, fetchVideoById } from "../Controller/video.controller.js"
import VerifyToken from "../Middleware/verifytoken.js";


function videoRoutes(app){
    app.post('/upload', VerifyToken, uploadvideo);
    app.get('/videos',fetchVideos);
    app.get('/video/:id',fetchVideoById);
}

export default videoRoutes;