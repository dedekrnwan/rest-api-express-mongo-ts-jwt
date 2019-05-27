import * as express from "express";
import ValidatorMiddleware from "../../middleware/validator.middleware";
import { Jwt } from "../../middleware/auth.middleware";

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
        this.router.route(this.action.path)
            .get(
                this.jwt.authenticated,
                this.action.index
            )
            .post(
                this.jwt.authenticated,
                this.action.store
            );
        this.router.route(`${this.action.path}/:id`)
            .get(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.action.details
            )
            .patch(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.validator.validate.body(this.validator.schema.User),
                this.action.update
            )
            .delete(
                this.jwt.authenticated,
                this.validator.validate.param(this.validator.schema.object.id, 'id'),
                this.action.delete
            )

        return this.router
    }
}

export default Routes