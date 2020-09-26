const express = require('express');
const auth = require('../middleware/auth');
const postController = require('../controllers/post');
const router = express.Router();


router.post('/datapost' , auth.isAuthenticated, postController.dataPost); 

router.put('/update',  auth.isAuthenticated, postController.dataUpdate);

router.get('/details', auth.isAuthenticated, postController.dataDetails); 

router.delete('/delete', auth.isAuthenticated, postController.dataDelete); 

router.delete('/deleteall', auth.isAuthenticated, postController.dataDeleteAll); 



module.exports = router;