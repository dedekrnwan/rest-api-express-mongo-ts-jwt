import * as express from "express";
import AAuth from "./../../actions/auth.action";
import MValidator from "../../middleware/validator.middleware";
import { Jwt as MJwt } from "./../../middleware/auth.middleware";
class Routes {
    constructor() {
        this.router = express.Router();
        this.jwt = new MJwt();
        this.validator = new MValidator();
        this.action = new AAuth();
        this.run();
    }
    run() {
        this.router.route('/login')
            .post(this.validator.validate.body(this.validator.schema.Auth.login), this.action.login);
        this.router.route('/register')
            .post(this.validator.validate.body(this.validator.schema.Auth.register), this.action.register);
        this.router.route('/forgot')
            .post(this.action.forgot);
        this.router.route('/reset')
            .post(this.action.reset);
        this.router.use(this.action.path, this.router);
    }
}
export default Routes;
//# sourceMappingURL=auth.routes.js.map