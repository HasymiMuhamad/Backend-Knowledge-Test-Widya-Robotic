
// -----------------User Profile Controller--------------------

const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
require('dotenv').config()



// ------------------Register a New User-----------------------
exports.userCreate = function(req, res, next){

let user = new User(
    {   
        _id: new mongoose.Types.ObjectId(),
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    })

    if (user.password){
        if (user.password !== '' && user.password.length >= 8){
            bcrypt
            .hash(user.password, saltRounds)
            .then(function(hash){
                user.password = hash
                user.save()
            .then(function() {
                res.status(200).json({
                    isSuccess : true,
                    data: user,
                    message : 'User is registered successfully.'
                })
            })
            .catch((err) => {
                res.status(400).send({ 
                    isSuccess : false, 
                    message : 
                    `${err.keyValue.username 
                        ? err.keyValue.username 
                        : err.keyValue.email
                    } ${err.keyValue.username 
                        ? 'username' 
                        : 'email'
                    } is already exist. Please use another ${
                        err.keyValue.username 
                        ? 'username.' 
                        : 'email address.'
                    }`
                });
            });
        });
        } else {
            res.status(400).json({
                isSuccess : false,
                message :  'Incorrect Password Format'
            })
        }
    } else {
        console.log('res data halo', res)
        res.status(400).json({
            isSuccess : false,
            message : 'Password is required'
        })
    }

}




// --------------------Connection Testing----------------------------------
exports.Test = function(req, res, next){
    res.status(200).json({
        message : "connection succes"
    });
    next();
}




// -----------------------User Login-------------------------------------
exports.login = (req, res) => {
    User.findOne({ 
        email: req.body.email 
    }, (err, userNote) => {
     if (err) {
        return res.status(400).json({
            isSuccess: false,
            message: 'error'
        })
     } else {
        if (!userNote) {
            return res.status(400).json({
                message: 'User not found'
            })
        }
   
      bcrypt
        .compare(req.body.password, userNote.password)
        .then((valid) => {
            if (!valid) {
                return res.status(400).json({
                    isSuccess: false,
                    message: 'Wrong Password'
                })
            }
   
            const token = jwt.sign(
                { id: userNote._id }, 
                'jwtsecret', 
                { expiresIn: '30d' }
            )
                return res.status(200).json({
                    isSuccess: true,
                    token: token,
                    message : 'Login Success'
                })
        })
        .catch(err => {
            return res.status(400).json({
                isSuccess: false,
                message: 'Password required to login'
            })
       })
     }
    })
   }





// ---------------------------Get User Data-----------------------
exports.userDetails = (req, res) => {
    if(req.body.id && req.body.id !== ''){
        var isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
        if (isValidObjectId){
            User.findOne({ _id : req.body.id }, function (err, result) {
                if (err){
                    res.json({
                        error : err.message
                    })
                } else {
                    res.json(result)
                }
            });
        } else {
            res.json({
                error : 'User Id is not registered'
            })
        }
    } else {
        User.find({}, function(err, result) {
            if (err) {
              res.json({
                  error : err.message
              })
            } else {
              res.json(result);
            }
          });
    }
}




// --------------------Delete a User--------------------------
exports.userDelete = function (req, res) {
    User.findOneAndDelete(
        {
            _id : req.body.id
        }, 
        function (err) {
            if (err) {
                res.status(400).json({
                    error : err.message
                })
            }
            res.status(200).json({
                isSuccess: true,
                message: 'User data is deleted successfully'
            })
        
    })
};



// --------------------Delete All User Data--------------------------
exports.userDeleteAll = function (req, res) {
    User.deleteMany({}, function (err) {
        if (err){
            res.status(400).json({
                error : err.message
            })
        } else {
            res.status(200).json({
                isSuccess : true,
                message : 'All User data is deleted successfully'
            })
        }
    });
};





