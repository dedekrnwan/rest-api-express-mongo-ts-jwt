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
class UserAction {
    constructor() {
        this.path = '/user';
        this.router = express.Router();
        this.jwt = new Jwt();
        this.routes();
    }
    routes() {
        this.router.route(this.path)
            .get(this.jwt.authenticated, this.index)
            .post(this.jwt.authenticated, this.store);
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
}
export default UserAction;
//# sourceMappingURL=user.action.js.map