import express from 'express';
import mongoose from 'mongoose';
import userroutes from './Routes/user.routes.js';
import cors from 'cors'
import ChannelRoutes from './Routes/channel.routes.js';
import videoRoutes from './Routes/video.routes.js';

//Creating New Server
const app = new express();

//Establishing Connection between server and Database
mongoose.connect('mongodb://localhost:27017/youtube')

//Running Server on Port 5100
app.listen(5100,() => {
    console.log("Server running on port 5100")
})

//Fetching connection Status
const db = mongoose.connection;

//If connection successfull it will be consoled
db.on('open', ()=> {
    console.log('Connection successfully established')
})

//Allowing Cors and parsing the data
app.use(cors())
app.use(express.json())


//Passing Routes Request
userroutes(app);
ChannelRoutes(app);
videoRoutes(app);