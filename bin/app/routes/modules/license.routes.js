import * as express from "express";
import MValidator from "../../middleware/validator.middleware";
import { Jwt as MJwt } from "../../middleware/auth.middleware";
import ALicense from "./../../actions/license.action";
class Routes {
    constructor() {
        this.router = express.Router();
        this.jwt = new MJwt();
        this.validator = new MValidator();
        this.action = new ALicense();
        this.run();
    }
    run() {
        this.router.route(this.action.path)
            .get(this.jwt.authenticated, this.action.index)
            .post(this.jwt.authenticated, this.validator.validate.body(this.validator.schema.License), this.action.store);
        this.router.route(`${this.action.path}/:id`)
            .get(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.action.details)
            .patch(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.validator.validate.body(this.validator.schema.License), this.action.update)
            .delete(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.action.delete);
    }
}
export default Routes;
//# sourceMappingURL=license.routes.js.map