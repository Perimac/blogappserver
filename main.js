require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const controller = require('./controller/usercontroller');

const port = process.env.PORT || 6999;



server.listen(port,function(){
    console.log('server init...');
    // server.get('/',function(req,res){res.json('Server Initialised');});
    mongoose.connect(process.env.ATLAS_DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('ATLAS CONNECTED...');
        server.use(express.json());
        //API REQUEST AND ROUTES FOR USERS
        server.post('/register',controller.signUpUser);
        server.patch('/fpwd/:userName',controller.forgotPassword);
        server.delete('/deluser/:userName',controller.deleteUser);
        server.post('/login',controller.signInUser);

    }).catch(function(err){console.log(err.message);});

});