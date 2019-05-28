import RUser from "./modules/user.routes";
import RAuth from "./modules/auth.routes";
import RLicense from "./modules/license.routes";
class Routes {
    constructor() {
        this.routes = [
            new RUser(),
            new RAuth(),
            new RLicense()
        ];
    }
}
export default Routes;
//# sourceMappingURL=routes.js.map