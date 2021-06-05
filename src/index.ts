const express = require('express');
import { Request, Response, NextFunction } from 'express';
// import { router } from './routes/loginRoutes';
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const exampleRoute = require('./routes/example');

require('dotenv').config();

const app = express();

app.use(helmet());
app.use(compression());
// app.use(morgan('combined', { stream: accessLogStream }));
app.use(morgan('dev', {
    skip: function (req: Request, res: Response, next: NextFunction) { return res.statusCode < 400 }
  }));
// app.use(morgan('combined',)); // combined common dev short tiny


// app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req: Request, res: Response, next: NextFunction) => {

  var allowedOrigins: string[] = [
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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization' );
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

app.get('/xxx', (req: Request, res: Response, next: NextFunction) => {
  res.send('hi from nodejs-express-template ts /xxx');
});

app.get('/healthz', (req: Request, res: Response, next: NextFunction) => {
  res.send('<h3> /healthz</h3>');
});

app.get('/error-test', (req: Request, res: Response, next: NextFunction) => {
   res.status(400).json({ message: 'error occured' });

  // const error = new Error('error response from example route.');
  // res.status(400); // using response here
  // next(error);
  // return;
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  console.log(error.statusCode);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
  // res.json({ message: message, data: data })
})

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}....`)
})