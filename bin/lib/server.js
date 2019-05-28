import App from "./app";
import Server from "./../app/config/server";
const app = new App();
app.run(new Server().app.port);
//# sourceMappingURL=server.js.map