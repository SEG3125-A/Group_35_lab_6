// Entry point for the application

// express application
const express = require('express');

// require the controller we make
const surveyController = require('./surveyController');

const app = express();

// set up view engine on app settings
app.set('view engine', 'ejs');

// Middleware
// static file serving, so that css and images will be correctly loaded
app.use('/public',express.static('public'));


//fire function from surveyController
surveyController(app);

//listen to port
app.listen(3000);
console.log('listening port 3000');

