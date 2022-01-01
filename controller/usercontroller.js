const User = require('../model/usermodel');
const config = require('../services/config');
const jwt = require('jsonwebtoken');

async function signUpUser(req, res) {
    try {
        const newUser = User({
            userName: req.body.userName,
            userEmail: req.body.userEmail,
            userPassword: req.body.userPassword
        });
        await newUser.save();
        res.status(200).json({success: true, message:'User Created'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getUser(req, res){
    try {
        const criteria = req.params.userName;
        const result = await User.findOne({userName: criteria});
        res.status(200).json({success: true,data: result});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

async function getAllUsers(req,res) {
    try {
        const result = await User.find({});
        // const sliced = result.slice(0,2);
        res.status(200).json({success:true, data:result});
    } catch (error) {
        res.status(404).json({success: false, message: error.message});
    }
}


async function loginUser(req, res) {
    try {
        const criteria = req.body.userName;
        const result = await User.findOne({userName: criteria});
        if(result === null) {
            return res.status(403).json({message:'User does not exist'});
        }
        if(result.userPassword != req.body.userPassword){ 
            return res.status(403).json({message: 'Invalid user password'});
        }
        //JSONWEBTOKEN GOES HERE
        let userToken = jwt.sign({payload: req.params.userName}, //it can be the whole user object or just userName or anything in your req.body
             config.sk,
             {expiresIn: "24h"} // this means the token wil expire after 24hours or a whole day
            )
        res.status(200).json({success:true,token:userToken});

    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}


async function forgotPassword(req, res) {
    try {
        const criteria = req.params.userName;
        const newpwd = req.body.userPassword;
        await User.findOneAndUpdate({userName: criteria},{userPassword: newpwd});
        res.status(200).json({success:true, message:'Password Reset Successfully'})
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}

async function deleteUser(req, res) {
    try {
        const criteria = req.params.userName;
        await User.findOneAndDelete({userName: criteria});
        res.status(200).json({success:true, message:'User Account Deleted Succesfully'});        
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}


module.exports = {
    signUpUser,
    forgotPassword,
    deleteUser,
    loginUser,
    getUser,
    getAllUsers
};