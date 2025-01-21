import express from 'express';
import mongoose from 'mongoose';
import userroutes from './Routes/user.routes.js';
import cors from 'cors'

const app = new express();
mongoose.connect('mongodb://localhost:27017/youtube')

app.listen(5100,() => {
    console.log("Server running on port 5100")
})

const db = mongoose.connection;

db.on('open', ()=> {
    console.log('Connection successfully established')
})

app.use(cors())
app.use(express.json())



userroutes(app);