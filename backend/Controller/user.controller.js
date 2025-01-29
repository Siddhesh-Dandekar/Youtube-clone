import userModel from "../Model/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export function registerUser(req, res) {
    const { username, email, password } = req.body;
    console.log(username, email, password)
    userModel.findOne({ email: email }).then(data => {
        if (!data) {
            const newuser = new userModel({
                username,
                email,
                password
            })
            newuser.save();
            return res.status(201).json({message: "Successfully Registered", error: false});
        }
        res.status(200).json({
            message: "email already registered",
            error: true
        });
    }).catch(err => {
            res.json({error:true, message:err});
    })

}

export function loginUser(req, res) {
    const { email, password } = req.body;
    userModel.findOne({ email: email }).then(data => {
        if (!data) {
            return res.status(404).json({ error: true, message: 'Create account before login' })
        }
        else if (data.password == password) {
            const accesstoken = jwt.sign(email, 'Secretkey', {})

            return res.status(200).json({ token: accesstoken });
        }
        res.status(400).json({ error: true, message: 'Invalid Password' })
    })
}

export function fetchUser(req, res) {
    return res.status(200).json(req.user)
}

