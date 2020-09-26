const Posting = require('../models/post');
const User = require('../models/user');
var mongoose = require('mongoose');
require('dotenv').config()



// -----------------Update News Data----------------------
exports.dataUpdate = function (req, res) {
    var post = new Posting (
        {
            dataTitle : req.body.dataTitle,
            dataContent : req.body.dataContent,
            dataWriter : req.body.dataWriter
        }
    );
    Posting.findByIdAndUpdate(
        req.body.id, 
        {
            $set: {
                dataTitle : req.body.dataTitle,
                dataContent : req.body.dataContent,
                dataWriter : req.body.dataWriter 
            }
        }, {
            returnOriginal : false
        },
        function (err, data) {
            if (err) {
                res.status(400).json({
                    error : err.message
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Data is updated successfully',
                    data: post
                })
            }
    });
};




// -------------------------Posting a News Data------------------------
exports.dataPost = function (req, res){
    if (req.body.id && req.body.id !== ''){
        var post = new Posting (
            {   
                dataTitle : req.body.dataTitle,
                dataContent : req.body.dataContent,
                dataWriter : req.body.dataWriter
            }
        );
    
        User.findByIdAndUpdate(req.body.id, 
            { $push: { datapost: post} }, 
            { new: true }, err => {
                if (err) {
                    console.log(err)
                }
        });

    
        post.save(
                function (err) {
                    if (err){
                        res.status(400).json({
                            error : err.message
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            message: 'Data is saved and posted successfully',
                            data: post
                        })
                    }
        })
    } else {
        res.status(400).json({
            isSuccess : false,
            message : 'Valid User Id is required'
        })
    }
    
    
};




// ---------------------Get News Data--------------------------
exports.dataDetails = function (req, res,next) {
    if(req.body.id && req.body.id !== ''){
        var isValidObjectId = mongoose.Types.ObjectId.isValid(req.body.id);
        if (isValidObjectId){
            Posting.findOne({ _id : req.body.id }, function (err, result) {
                if (err){
                    res.status(400).json({
                        error : err.message
                    })
                } else {
                    res.status(200).json(result)
                }
            });
        } else {
            res.status(400).json({
                error : 'Content Data is not found'
            })
        }
    } else {
        Posting.find({}, function(err, result) {
            if (err) {
              res.status(400).json({
                  error : err.message
              })
            } else {
              res.status(200).json(result);
            }
          });
    }
};




// --------------------Delete a News Data by Id--------------------------
exports.dataDelete = function (req, res) {
    Posting.findOneAndDelete(
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
                success: true,
                message: 'Data is deleted successfully'
            })
        
    })
};



// --------------------Delete All News Data--------------------------
exports.dataDeleteAll = function (req, res) {
    Posting.deleteMany({}, function (err) {
        if (err){
            res.status(400).json({
                error : err.message
            })
        } else {
            res.status(200).json({
                message : 'All data is deleted successfully'
            })
        }
    });
};


