import * as express from "express";
import User from "../models/user.models";
import { Jwt } from "../middleware/auth.middleware";
import ValidatorMiddleware from "../middleware/validator.middleware";

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
    private jwt = new Jwt()
    private validator = new ValidatorMiddleware()
    constructor(){
        this.routes()
    }

    private routes(){
        this.router.route(this.path)
            .get(
                this.jwt.authenticated,
                this.index
            )
            .post(
                this.jwt.authenticated,
                this.store
            );
        this.router.route(`${this.path}/:id`)
            .get(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.details
            )
            .patch(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.validator.validate.body(this.validator.schema.User),
                this.update
            )
            .delete(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.delete
            )
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
    public async details(req, res, next) {
        try {
            let users = await User.findById(req.params.id);
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
    public async update(req, res, next){
        try {
            let user:UserInterface = req.body 
            user  = await User.findByIdAndUpdate(req.params.id, user)
            user = await User.findById(req.params.id)
            //handle transaction
            res.status(200).json({
                response:  true,
                message: `User successfully updated`,
                data: user
            })
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
    public async delete(req, res, next) {
        try {
            let promise = User.findOneAndRemove(req.params.id)
            res.status(200).json({
                response:  true,
                message: `User successfully deleted`,
                data: promise
            })
        } catch (error) {
            next(error)
        }
    }
}

export default UserAction