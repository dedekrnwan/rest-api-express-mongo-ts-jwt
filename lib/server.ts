import App from "./app";
import Server from "./../app/config/server";

const app = new App(new Server().app.port)

app.run()