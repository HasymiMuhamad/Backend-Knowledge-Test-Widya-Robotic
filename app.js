//app.js ------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
require('./models/user');
const dataUser = require('./routes/user');
const dataPost = require('./routes/post');
const app = express();
const logger = require('morgan');
const env = require('dotenv').config()



// ---Mongoose Connection---------------------
const mongoose = require('mongoose');
const mongoDB = process.env.NEWSDB;
const db = mongoose.connection;
const port = process.env.PORT || 1236;

mongoose.connect(mongoDB,{
    useUnifiedTopology : true,
    useNewUrlParser :true,
    useCreateIndex : true
});
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(
    console, 'Error connection : MongoDB'
));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({
        limit:'50mb', 
        extended: true, 
        parameterLimit:50000
}));




// ---Base URL Routing--------------------------

//http://localhost:3000/api/v1/
app.use('/api/v1/user', dataUser);
app.use('/api/v1/post', dataPost);
app.use('/static', express.static('public'));
app.use(logger('dev'));



app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});

