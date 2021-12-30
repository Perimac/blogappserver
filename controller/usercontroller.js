const User = require('../model/usermodel');


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


module.exports = {signUpUser,forgotPassword,deleteUser};