require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
// const controller = require('./controller/usercontroller');
// const middleware = require('./services/middleware');
const userRoutes = require('./routes/userroutes');

const port = process.env.PORT || 6999;



server.listen(port,function(){
    console.log('server init...');
    mongoose.connect(process.env.ATLAS_DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
    .then(function(){
        console.log('ATLAS CONNECTED...');
        server.use(express.json());

        server.use('/users',userRoutes);
        // server.use('/users', userRoutes); //we can try this later on also
    }).catch(function(err){console.log(err.message);});

});