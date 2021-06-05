"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
// import { router } from './routes/loginRoutes';
var bodyParser = require('body-parser');
var helmet = require('helmet');
var morgan = require('morgan');
var compression = require('compression');
var exampleRoute = require('./routes/example');
require('dotenv').config();
var app = express();
app.use(helmet());
app.use(compression());
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev', {
    skip: function (req, res, next) { return res.statusCode < 400; }
}));
// app.use(morgan('combined',)); // combined common dev short tiny
// app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    var allowedOrigins = [
    // 'http://test.com',
    // 'http://localhost'
    ];
    var origin = req.headers.origin;
    // console.log(origin);
    //// for deploy
    // if(origin && allowedOrigins.indexOf(origin) > -1){
    //     res.setHeader('Access-Control-Allow-Origin', origin);
    // }
    //// for dev 
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
    //// for local dev
    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization' );
    // if (req.method === 'OPTIONS') {
    //     return res.sendStatus(200);
    // }
    // next();
});
app.use('/example', exampleRoute);
app.get('/xxx', function (req, res, next) {
    res.send('hi from nodejs-express-template ts /xxx');
});
app.get('/healthz', function (req, res, next) {
    res.send('<h3> /healthz</h3>');
});
app.get('/error-test', function (req, res, next) {
    res.status(400).json({ message: 'error occured' });
    // const error = new Error('error response from example route.');
    // res.status(400); // using response here
    // next(error);
    // return;
});
app.use(function (error, req, res, next) {
    console.log(error);
    console.log(error.statusCode);
    var status = error.statusCode || 500;
    var message = error.message;
    var data = error.data;
    res.status(status).json({ message: message, data: data });
    // res.json({ message: message, data: data })
});
var port = process.env.PORT || 4000;
app.listen(port, function () {
    console.log("Listening on port " + port + "...");
});
