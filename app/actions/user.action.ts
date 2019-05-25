import * as express from "express";
import { request } from "https";
import User from "./../../app/models/user.models";

interface UserInterface {
    email:string,
    username:string,
    name:string,
    birthdate:Date,
    password?:string,
    phone?:string,
    telephone?:string,
    address?:string,
    category?:string,
    email_verify_date?:Date,
    remember_token?:string,
    created_date?:Date,
    created_by_id?:string,
    updated_date?:Date,
    updated_by_id?:string
}

class UserAction
{
    public path = '/user'
    public router = express.Router()
    constructor(){
        this.routes()
    }

    private routes(){
        this.router.route(this.path)
            .get(this.index)
            .post(this.store);
    }

    public async index(req, res, next){
        try {
            let users = await User.find();
            if(users){
                res.status(200).json({
                    response: true,
                    message: `User has been retrieve`,
                    data: {
                        user: users
                    }
                })
            }else{
                res.status(200).json({
                    response: true,
                    message: `User is null`,
                    data: {
                        user: users
                    }
                })
            }
        } catch (error) {
            next(error)
        }
    }
    public async store(req, res, next){
        try {
            let user:UserInterface = req.body;
            let promise = new User(user);
            promise = await promise.save();
            res.status(201).json({
                response: true,
                message: `User has been stored`,
                data: {
                    user: promise
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

export default UserAction