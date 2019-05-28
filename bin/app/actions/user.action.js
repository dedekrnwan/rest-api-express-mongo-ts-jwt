var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import User from "../models/user.model";
import HResponse from "../helper/response.helper";
import HException from "./../helper/exception.helper";
class UserAction {
    constructor() {
        this.path = '/user';
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User.find();
                if (users) {
                    next(new HResponse().ok(`User has been retrieve`, { users: users }));
                }
                else {
                    next(new HResponse().noContent(`User is null`, { users: users }));
                }
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let users = yield User.findById(req.params.id);
                if (users) {
                    next(new HResponse().ok(`User has been retrieve`, { users: users }));
                }
                else {
                    next(new HResponse().notFound('User not found', { users: users }));
                }
            }
            catch (error) {
                next(new HException(error));
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
                next(new HResponse().ok(`User successfully updated`, { user: user }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    store(req, res, next) {
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
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise = User.findOneAndRemove(req.params.id);
                next(new HResponse().ok(`User successfully deleted`, { user: promise }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
}
export default UserAction;
//# sourceMappingURL=user.action.js.map