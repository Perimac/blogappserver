require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userroutes');
const port = process.env.PORT || 6999;


server.listen(port,function(){
    console.log('Periserver connected...');

    mongoose.connect(process.env.ATLAS_URL)
    .then(function(){
        console.log('ATLAS CONNECTED...');
        server.use(express.json());
        server.use(userRoutes);
    }).catch(function(err){console.log(err.message);});
    
});