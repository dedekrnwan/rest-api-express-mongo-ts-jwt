import * as express from "express";
import User from "../models/user.models";
import { Jwt } from "../middleware/auth.middleware";
import JwtHelper from "../helper/jwt.helper";
import ValidatorMiddleware from "../middleware/validator.middleware";
import * as bcrypt from "bcrypt";

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

class AuthAction
{
    public path = '/auth'
    public router:express.Router = express.Router()
    private jwt:Jwt = new Jwt()
    private validator:ValidatorMiddleware = new ValidatorMiddleware()
    constructor(){
        this.routes()
    }

    private routes(){
        this.router.route('/login')
            .post(
                this.validator.validate.body(this.validator.schema.Auth.login),
                this.login
            )
        this.router.route('/register')
            .post(
                this.validator.validate.body(this.validator.schema.Auth.register),
                this.register
            )
        this.router.route('/forgot')
            .post(
                this.forgot
            )
        this.router.route('/reset')
            .post(
                this.reset
            )
        this.router.use(this.path, this.router)
    }

    public async login(req, res, next){
        try {
            let user = await User.findOne({
                email: req.body.email
            });
            if(user){
                let check = await bcrypt.compare(req.body.password, user.password);
                if(check){
                    const Jwt_helper = new JwtHelper({
                        _id: user._id
                    });
                    let token = await Jwt_helper.sign(); //need sign options
                    res.status(200).json({
                        response: true,
                        message: `User successfully login`,
                        data: {
                            token: token,
                            // user: user
                        }
                    })
                }else{
                    res.status(200).json({
                        response: false,
                        message: `Email or password is invalid`,
                        data: user
                    })
                }
            }else{
                res.status(200).json({
                    response: false,
                    message: `Email or password is invalid`,
                    data: user
                })
            }
        } catch (error) {
            next(error)
        }
    }
    public async register(req, res, next){
        try {
            req.body['password'] = await bcrypt.hash(req.body['password'], 10);
            let user = new User(req.body);
            user = await user.save(); 
            res.status(200).json({
                response: true,
                message: `User successfully registered`,
                data: user
            })
        } catch (error) {
            return next(error);
        }
    }
    public async forgot(req, res, next){
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
    public async reset(req, res, next){
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

export default AuthAction