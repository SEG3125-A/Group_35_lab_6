// this code is inspired by Caroline Barriere's code and NetNinja https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7
// required packages
// Entry point for the application

// express application
const express = require('express');
const morgan = require('morgan');
var multer = require('multer');
var upload = multer();
// require the controller we make
const surveyController = require('./surveyController');

const app = express();

// set up view engine on app settings
app.set('view engine', 'ejs');

// Middleware
// static file serving, so that css and images will be correctly loaded
app.use(express.static('public'));
app.use(upload.array());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
//3rd party middleware
app.use(morgan('dev'));

//fire function from surveyController
surveyController(app);

//listen to port
app.listen(3000);
console.log('listening port 3000');

