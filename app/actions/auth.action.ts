import * as express from "express";
import * as bcrypt from "bcrypt";
import { promises } from "fs";

import User from "../models/user.model";

import HResponse from "./../helper/response.helper";
import HJwt from "../helper/jwt.helper";

import IUser from "./../interfaces/user.interfaces";


class AuthAction
{
    public path = '/auth'

    constructor(){

    }

    public async login(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let user = await User.findOne({
                email: req.body.email
            });
            if(user){
                let check = await bcrypt.compare(req.body.password, user.password);
                if(check){
                    const Jwt_helper = new HJwt({
                        _id: user._id
                    });
                    let token = await Jwt_helper.sign(); //need sign options
                    next(new HResponse().ok(`User successfully login`,{ token: token }))
                }else{
                    next(new HResponse().badRequest(`Email or password is invalid`,{ user: user }))
                }
            }else{
                next(new HResponse().badRequest(`Email or password is invalid`,{ user: user }))
            }
        } catch (error) {
            next(error)
        }
    }
    public async register(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            req.body['password'] = await bcrypt.hash(req.body['password'], 10);
            let user = new User(req.body);
            user = await user.save();
            next(new HResponse().ok(`User successfully login`,{ user: user }))
        } catch (error) {
            next(error);
        }
    }
    public async forgot(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let user:IUser = req.body;
            let promise = new User(user);
            promise = await promise.save();
            next(new HResponse().created(`User has been stored`,{ user: promise }))
        } catch (error) {
            next(error)
        }
    }
    public async reset(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let user:IUser = req.body;
            let promise = new User(user);
            promise = await promise.save();
            next(new HResponse().created(`User has been stored`,{ user: promise }))
        } catch (error) {
            next(error)
        }
    }
}

export default AuthAction