
// --------------Model Schema for User Profile------------------
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema({
    _id : Schema.Types.ObjectId,
    username : {
        type : String, 
        required : true, 
        max : 100,
        unique : true
    },
    password : {
        type : String, 
        required : true, 
        min : 8
    },
    email : { 
        type : String, 
        format : 'email',
        required: true,
        unique: 'Email is already exist',
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    datapost : [{ 
        type: Schema.Types.Mixed, 
        ref: 'Posting' 
    }]
})



module.exports = mongoose.model('User', userSchema);

