const express = require('express');
const port = process.env.PORT || 6999;

const server = express();


server.listen(port,function(){
    console.log('server init...');
    server.get('/',function(req,res){res.json('Server Initialised');});

})