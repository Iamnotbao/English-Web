import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const authMiddleware  =(req : Request, res : Response, next : NextFunction) => {
    const authHeader = req.headers["authorization"];
    if(!authHeader){
        return res.status(401).json({
            message: "Authorization header is missing",
        });
    }
    const token = authHeader.split(" ")[1];
    jwt.verify(token,'access_token',function(err,user){
        if(err){
            return res.status(404).json({
                message:"The user is not authenticated",
            })
        }
       (req as any).user = user; 

      (req as any).user = user
      next();
    });
}
export default authMiddleware;
