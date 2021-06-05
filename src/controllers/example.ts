
import { Request, Response, NextFunction } from 'express';

exports.exampleGet = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'example route get success'}); 
 }
 
 exports.exampleGetError = (req: Request, res: Response, next: NextFunction) => {
   // //just for example error send
  //  const error = new Error('error response from example route.');
  //  error.statusCode = 400;
  //  throw error;

  // const error = new Error('error response from example route.');
  //  res.status(400); // using response here
  //  next(error);
  //  return;
 
   res.status(400).json({ message: 'error response from example route.'})
 }