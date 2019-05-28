var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import HJwt from "./jwt.helper";
import User from "./../models/user.model";
class Auth {
    constructor() {
    }
    user(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get the token from the header if present
                let token = req.headers["authorization"];
                token = token.replace('Bearer ', '');
                let decode = yield new HJwt(token).decode();
                let data = User.findById(decode['payload']._id);
                return data;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
export default Auth;
//# sourceMappingURL=auth.helper.js.map