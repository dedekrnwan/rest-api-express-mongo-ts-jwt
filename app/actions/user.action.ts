import * as express from "express";
import User from "../models/user.model";
import IUser from "./../interfaces/user.interfaces";
import HResponse from "../helper/response.helper";

class UserAction
{
    public path = '/user'
    constructor(){

    }

    public async index(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let users = await User.find();
            if(users){
                next(new HResponse().ok(`User has been retrieve`,{ users: users }))
            }else{
                next(new HResponse().noContent(`User is null`,{ users: users }))
            }
        } catch (error) {
            next(error)
        }
    }
    public async details(req: express.Request, res: express.Response, next: express.NextFunction) :Promise<any>{
        try {
            let users = await User.findById(req.params.id);
            if(users){
                next(new HResponse().ok(`User has been retrieve`,{ users: users }))
            }else{
                next(new HResponse().notFound('User not found', { users: users }))
            }
        } catch (error) {
            next(error)
        }
    }
    public async update(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let user:IUser = req.body 
            user  = await User.findByIdAndUpdate(req.params.id, user)
            user = await User.findById(req.params.id)
            //handle transaction
            next(new HResponse().ok(`User successfully updated`,{ user: user }))
        } catch (error) {
            next(error)
        }
    }
    public async store(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let user:IUser = req.body;
            let promise = new User(user);
            promise = await promise.save();
            next(new HResponse().created(`User has been stored`,{ user: promise }))
        } catch (error) {
            next(error)
        }
    }
    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) :Promise<any>{
        try {
            let promise = User.findOneAndRemove(req.params.id)
            next(new HResponse().ok(`User successfully deleted`,{ user: promise }))
        } catch (error) {
            next(error)
        }
    }
}

export default UserAction