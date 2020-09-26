const userController = require('../controllers/user');
const express = require('express');
const auth = require('../middleware/auth');
const router = express.Router();



router.get('/test',  userController.Test);

router.post('/login',  userController.login);

router.post('/register', userController.userCreate);

router.get('/details',  auth.isAuthenticated, userController.userDetails);

router.delete('/delete', auth.isAuthenticated, userController.userDelete); 

router.delete('/deleteall', auth.isAuthenticated, userController.userDeleteAll); 



module.exports = router;



