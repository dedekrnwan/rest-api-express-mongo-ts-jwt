var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwtHelper from "./../helper/jwt.helper";
class Jwt {
    constructor() {
    }
    authenticated(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //get the token from the header if present
                let token = req.headers["x-api-key"] || req.headers["authorization"];
                //if no token found, return response (without going to the next middelware)
                if (!token)
                    return res.status(401).json({
                        response: false,
                        message: "Access denied. No token provided.",
                        data: req.body
                    });
                //if can verify the token, set req.user and pass to next middleware
                token = token.replace('Bearer ', '');
                let Jwt_Helper = new jwtHelper(token);
                const decoded = yield Jwt_Helper.verify();
                req.user = decoded;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
}
export { Jwt };
//# sourceMappingURL=auth.middleware.js.map