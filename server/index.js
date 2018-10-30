// Main starting point of the application
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();

const _config = require('config.json')('./config/config.json');

// DB Setup
// mongoose.connect('mongodb://127.0.0.1:27017/auth');
// var url = "mongodb://heroku_4gshc1l0:hl47k1p8vnv20e20gs3m1m2ihc@ds123790.mlab.com:23790/heroku_4gshc1l0";
var url = 'mongodb://' + _config.mongodb.username+':'+ _config.mongodb.password+'@' + _config.mongodb.host + ':' + _config.mongodb.port + '/' + _config.mongodb.db;
mongoose.connect(url);
mongoose.Promise = global.Promise;

// App Setup
app.use(morgan('combined'));
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// Initialise routes
app.use('/', require('./routes/authentication'));

// Server Setup
const port = process.env.PORT || 3090;
app.listen(port, function() {
  console.log('Server listening on: ', port);
});