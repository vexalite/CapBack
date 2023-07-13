import { validationResult } from "express-validator"
// import { Request, Response, NextFunction } from 'express';

export const handleInputErrors = (req, res, next) => {
     const err = validationResult(req)
     // console.log(err)

     if(!err.isEmpty()){
          res.status(400)
          res.json({err})
     } else{
          next()
     }

}