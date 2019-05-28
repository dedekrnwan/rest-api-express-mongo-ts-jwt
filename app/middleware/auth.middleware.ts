import jwtHelper from "./../helper/jwt.helper";
import * as express from "express";
import { IResponse } from "./../interfaces/response.interface";
import HResponse from "./../helper/response.helper";
import HException from "./../helper/exception.helper";

class Jwt {
    constructor(){

    }

    public async authenticated(req: express.Request, res:express.Response, next:express.NextFunction):Promise<any>{
        try {
            //get the token from the header if present
            let token:string = req.headers["authorization"];
            //if no token found, return response (without going to the next middelware)
            if (!token){
                next(new HResponse().unAuthorized('Access denied. No token provided.', req.body))
            }else{
                //if can verify the token, set req.user and pass to next middleware
                token = token.replace('Bearer ','');
                let Jwt_Helper = new jwtHelper(token);
                const decoded = await Jwt_Helper.verify();
                next();
            }
            
        } catch (error) {
            console.log(error)
            next(await new HException(error))
        }
    }
    public async authorized(req: express.Request, res:express.Response, next:express.NextFunction):Promise<any>{
        try {
            
        } catch (error) {
            next(await new HException(error))
        }
    }
}

export { Jwt }