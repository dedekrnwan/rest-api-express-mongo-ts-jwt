var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model";
import HJwt from "../helper/jwt.helper";
import * as bcrypt from "bcrypt";
class AuthAction {
    constructor() {
        this.path = '/auth';
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield User.findOne({
                    email: req.body.email
                });
                if (user) {
                    let check = yield bcrypt.compare(req.body.password, user.password);
                    if (check) {
                        const Jwt_helper = new HJwt({
                            _id: user._id
                        });
                        let token = yield Jwt_helper.sign(); //need sign options
                        res.status(200).json({
                            response: true,
                            message: `User successfully login`,
                            data: {
                                token: token,
                            }
                        });
                    }
                    else {
                        res.status(200).json({
                            response: false,
                            message: `Email or password is invalid`,
                            data: user
                        });
                    }
                }
                else {
                    res.status(200).json({
                        response: false,
                        message: `Email or password is invalid`,
                        data: user
                    });
                }
            }
            catch (error) {
                next(error);
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body['password'] = yield bcrypt.hash(req.body['password'], 10);
                let user = new User(req.body);
                user = yield user.save();
                res.status(200).json({
                    response: true,
                    message: `User successfully registered`,
                    data: user
                });
            }
            catch (error) {
                return next(error);
            }
        });
    }
    forgot(req, res, next) {
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
    reset(req, res, next) {
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
export default AuthAction;
//# sourceMappingURL=auth.action.js.map