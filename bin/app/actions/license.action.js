var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import License from "./../models/license.model";
import HResponse from "./../helper/response.helper";
import HAuth from "./../helper/auth.helper";
import HException from "./../helper/exception.helper";
class LicenseAction {
    constructor() {
        this.path = '/license';
    }
    index(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield License.find().exec();
                next(new HResponse().ok('License has been retrieve', {
                    License: data,
                }));
            }
            catch (error) {
                next(new HException(error));
            }
        });
    }
    details(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let data = yield License.findById(req.params.id);
                if (data) {
                    next(new HResponse().ok(`License has been retrieve`, { License: data }));
                }
                else {
                    next(new HResponse().notFound('License not found', { License: data }));
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
                let data = req.body;
                data.updated_date = new Date();
                data.updated_by_id = (yield new HAuth().user(req))._id;
                data = yield License.findByIdAndUpdate(req.params.id, data);
                data = yield License.findById(req.params.id);
                //handle transaction
                next(new HResponse().ok(`User successfully updated`, { License: data }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    store(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let body = req.body;
                body.created_date = new Date();
                body.created_by_id = (yield new HAuth().user(req))._id;
                body.updated_date = new Date();
                body.updated_by_id = (yield new HAuth().user(req))._id;
                let data = new License(body);
                data = yield data.save();
                next(new HResponse().created(`User has been stored`, { License: data }));
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let promise = License.findOneAndRemove(req.params.id);
                next(new HResponse().ok(`User successfully deleted`, { License: promise }));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
export default LicenseAction;
//# sourceMappingURL=license.action.js.map