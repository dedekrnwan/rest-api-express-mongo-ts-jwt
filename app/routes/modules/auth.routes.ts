import * as express from "express";
import ValidatorMiddleware from "../../middleware/validator.middleware";
import { Jwt } from "./../../middleware/auth.middleware";

class Routes {
    private validator:ValidatorMiddleware
    private jwt:Jwt
    private router = express.Router()
    private action:any
    constructor(action:any) {
        this.jwt = new Jwt()
        this.validator = new ValidatorMiddleware()
        this.action = new action()
    }
    
    public run(){
        this.router.route('/login')
            .post(
                this.validator.validate.body(this.validator.schema.Auth.login),
                this.action.login
            )
        this.router.route('/register')
            .post(
                this.validator.validate.body(this.validator.schema.Auth.register),
                this.action.register
            )
        this.router.route('/forgot')
            .post(
                this.action.forgot
            )
        this.router.route('/reset')
            .post(
                this.action.reset
            )
        this.router.use(this.action.path, this.router)

        return this.router
    }
}

export default Routes