var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as bcrypt from "bcrypt";
import User from "../models/user.model";
import HResponse from "./../helper/response.helper";
import HException from "./../helper/exception.helper";
import HJwt from "../helper/jwt.helper";
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
                        next(new HResponse().ok(`User successfully login`, { token: token }));
                    }
                    else {
                        next(new HResponse().badRequest(`Email or password is invalid`, { user: user }));
                    }
                }
                else {
                    next(new HResponse().badRequest(`Email or password is invalid`, { user: user }));
                }
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                req.body['password'] = yield bcrypt.hash(req.body['password'], 10);
                let user = new User(req.body);
                user = yield user.save();
                next(new HResponse().ok(`User successfully login`, { user: user }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    forgot(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let promise = new User(user);
                promise = yield promise.save();
                next(new HResponse().created(`User has been stored`, { user: promise }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    reset(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                let promise = new User(user);
                promise = yield promise.save();
                next(new HResponse().created(`User has been stored`, { user: promise }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
}
export default AuthAction;
//# sourceMappingURL=auth.action.js.map