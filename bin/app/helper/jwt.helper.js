var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import jwtConfig from "./../config/jwt";
class Jwt {
    constructor(data, $options) {
        this.data = data;
        //key
        this.key();
        if (!$options) {
            this.options = jwtConfig.options;
        }
        else {
            this.options.issuer = ($options.issuer) ? $options.issuer : this.options.issuer;
            this.options.subject = ($options.subject) ? $options.subject : this.options.subject;
            this.options.audience = ($options.audience) ? $options.audience : this.options.audience;
            this.options.expiresIn = ($options.expiresIn) ? $options.expiresIn : this.options.expiresIn;
            this.options.algorithm = ($options.algorithm) ? $options.algorithm : this.options.algorithm;
        }
    }
    key() {
        try {
            this.private = fs.readFileSync(`${__dirname}/../utils/private.key`, 'utf-8');
            this.public = fs.readFileSync(`${__dirname}/../utils/public.key`, 'utf-8');
        }
        catch (error) {
            console.log(`error reading key: `, error);
            throw error;
        }
    }
    sign() {
        return __awaiter(this, void 0, void 0, function* () {
            // Token signing options
            let option = {
                issuer: this.options.issuer,
                subject: this.options.subject,
                audience: this.options.audience,
                expiresIn: "30d",
                algorithm: "RS256"
            };
            return yield jwt.sign(this.data, this.private, option);
        });
    }
    verify() {
        return __awaiter(this, void 0, void 0, function* () {
            let option = {
                issuer: this.options.issuer,
                subject: this.options.subject,
                audience: this.options.audience,
                expiresIn: "30d",
                algorithm: ["RS256"]
            };
            return yield jwt.verify(this.data, this.public, option);
        });
    }
    decode() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield jwt.decode(this.data, {
                complete: true
            });
        });
    }
}
export default Jwt;
//# sourceMappingURL=jwt.helper.js.map