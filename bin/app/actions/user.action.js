var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as express from "express";
import User from "../models/user.models";
import { Jwt } from "../middleware/auth.middleware";
import ValidatorMiddleware from "../middleware/validator.middleware";
class UserAction {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.jwt = new Jwt();
        this.validator = new ValidatorMiddleware();
        this.routes();
    }
    routes() {
        this.router.route(this.path)
            .get(this.jwt.authenticated, this.index)
            .post(this.jwt.authenticated, this.store);
        this.router.route(`${this.path}/:id`)
            .get(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.details)
            .patch(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.validator.validate.body(this.validator.schema.User), this.update)
            .delete(this.jwt.authenticated, this.validator.validate.param(this.validator.schema.object.id, 'id'), this.delete);
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User.find();
                if (users) {
                    res.status(200).json({
                        response: true,
                        message: `User has been retrieve`,
                        data: {
                            user: users
                        }
                    });
                }
                else {
                    res.status(200).json({
                        response: true,
                        message: `User is null`,
                        data: {
                            user: users
                        }
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User.findById(req.params.id);
                if (users) {
                    res.status(200).json({
                        response: true,
                        message: `User has been retrieve`,
                        data: {
                            user: users
                        }
                    });
                }
                else {
                    res.status(200).json({
                        response: true,
                        message: `User is null`,
                        data: {
                            user: users
                        }
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                user = yield User.findByIdAndUpdate(req.params.id, user);
                user = yield User.findById(req.params.id);
                //handle transaction
                res.status(200).json({
                    response: true,
                    message: `User successfully updated`,
                    data: user
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let promise = new User(user);
                promise = yield promise.save();
                res.status(201).json({
                    response: true,
                    message: `User has been stored`,
                    data: {
                        user: promise
                    }
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise = User.findOneAndRemove(req.params.id);
                res.status(200).json({
                    response: true,
                    message: `User successfully deleted`,
                    data: promise
                });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
export default UserAction;
//# sourceMappingURL=user.action.js.map