import * as express from "express";
import AUser from "./../../actions/user.action";
import MValidator from "../../middleware/validator.middleware";
import { Jwt as MJwt } from "../../middleware/auth.middleware";
class Routes {
    constructor() {
        this.router = express.Router();
        this.jwt = new MJwt();
        this.validator = new MValidator();
        this.action = new AUser();
        this.run();
    }
    run() {
        this.router.route(this.action.path)
            .get(this.jwt.authenticated, this.action.index)
            .post(this.jwt.authenticated, this.validator.validate.body(this.validator.schema.User), this.action.store);
        this.router.route(`${this.action.path}/:id`)
            .get(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.action.details)
            .patch(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.validator.validate.body(this.validator.schema.User), this.action.update)
            .delete(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.action.delete);
    }
}
export default Routes;
//# sourceMappingURL=user.routes.js.map