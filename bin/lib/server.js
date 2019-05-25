import App from "./app";
import UserAction from "../app/actions/user.action";
import AuthAction from "../app/actions/auth.action";
import Server from "./../app/config/server";
const app = new App([
    new UserAction(),
    new AuthAction()
], new Server().app.port);
app.run();
//# sourceMappingURL=server.js.map