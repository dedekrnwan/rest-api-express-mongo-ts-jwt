import RUser from "./modules/user.routes";
import RAuth from "./modules/auth.routes";

class Routes {
    public routes:any
    constructor() {
        this.routes = [
            new RUser(),
            new RAuth(),
        ]
    }
}

export default Routes