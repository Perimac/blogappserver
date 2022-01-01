const express = require('express');
const router = express.Router();
const controller = require('../controller/usercontroller');
const middleware = require('../services/middleware');


//ALL USER ROUTES
router.get('/',function(req,res){res.json('Welcome to Perimac API');});
router.post('/register',controller.signUpUser);
router.patch('/fpwd/:userName',controller.forgotPassword);
router.delete('/deluser/:userName',controller.deleteUser);
router.post('/login',controller.loginUser);
router.get('/user/:userName',middleware.verifyToken,controller.getUser);
router.get('/all',middleware.verifyToken,controller.getAllUsers);

module.exports = router;

