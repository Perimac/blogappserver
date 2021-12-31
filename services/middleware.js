 const jwt = require('jsonwebtoken');
 const config = require('../services/config');

 const verifyToken =(req, res, next) => {
     //Getting the token from the request headers cz thats where its being passed upon creation
    let token = req.headers['authorization'];
    if(token) {
        jwt.verify(token,config.sk,(err,decoded) =>{
            //check if token is valid or not
            if(err) return res.json({success:false,message:'Invalid Token'});
            //if token is valid then we store the decoded token in pur request.decoded
            req.decoded = decoded;
            next();
        });
    }else {
        res.json({success:false,message:'User Token is required'});
    }
 }
 module.exports ={verifyToken};