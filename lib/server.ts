import App from "./app";
import UserAction from "./../app/actions/user.action";
import Server from "./../app/config/server";

const app = new App([
    new UserAction()
], new Server().app.port)

app.run()