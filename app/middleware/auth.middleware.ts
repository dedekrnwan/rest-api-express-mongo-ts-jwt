import jwtHelper from "./../helper/jwt.helper";
import * as express from "express";

class Jwt {
    constructor(){

    }

    public async authenticated(req: express.Request, res:express.Response, next:express.NextFunction):Promise<any>{
        try {
            //get the token from the header if present
            let token:string = req.headers["authorization"];
            //if no token found, return response (without going to the next middelware)
            if (!token)   
                return res.status(401).json({
                    response: false,
                    message: "Access denied. No token provided.",
                    data: req.body
                });
            //if can verify the token, set req.user and pass to next middleware
            token = token.replace('Bearer ','');
            let Jwt_Helper = new jwtHelper(token);
            const decoded = await Jwt_Helper.verify();
            next();
        } catch (error) {
            next(error)
        }
    }
    public async authorized(req: express.Request, res:express.Response, next:express.NextFunction):Promise<any>{
        try {
            
        } catch (error) {
            next(error)
        }
    }
}

export { Jwt }