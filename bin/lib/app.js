import * as express from "express";
import * as bodyparser from "body-parser";
import * as morgan from "morgan";
import Database from "./../app/config/database";
import Server from "./../app/config/server";
import * as cors from "cors";
import Routes from "./../app/routes/routes";
import MResponse from "./../app/middleware/response.middleware";
import HResponse from "./../app/helper/response.helper";
class App {
    constructor(port) {
        this.app = express();
        this.port = port;
        this.middleware();
        this.routes(new Routes().routes);
        this.connection();
    }
    middleware() {
        this.app.use(cors());
        this.app.use(morgan('dev'));
        this.app.use(bodyparser.urlencoded({
            extended: true
        }));
        this.app.use(bodyparser.json());
    }
    routes(routes) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
        //404 handler
        this.app.use((req, res, next) => {
            next(new HResponse().notFound(`Not Found`, {}));
        });
        //repsonse handler
        this.app.use(MResponse);
    }
    connection() {
        const database = new Database();
        database.connection().fractal();
    }
    run() {
        this.app.listen(this.port, () => {
            console.log(`${new Server().app.name} listening on the port ${this.port}`);
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map