import HJwt from "./jwt.helper";
import * as express from "express";
import User from "./../models/user.model";

class Auth 
{
    constructor(){

    }

    public async user(req:express.Request){
        try {
            //get the token from the header if present
            let token:string = req.headers["authorization"]
            token = token.replace('Bearer ','');
            let decode = await new HJwt(token).decode()
            let data = User.findById(decode['payload']._id)
            return data
        } catch (error) {
            throw error;
        }
    }
}

export default Auth