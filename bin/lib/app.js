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
    constructor() {
        this.app = express();
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
        //error handler
        //repsonse handler
        this.app.use(MResponse);
    }
    connection() {
        const database = new Database();
        database.connection().fractal();
    }
    run(port) {
        this.app.listen(port, () => {
            console.log(`${new Server().app.name} listening on the port ${port}`);
        }).on('error', (err) => {
            let another_port = [8080, 80, 3000, 4000, 5000];
            let next = another_port[Math.floor(Math.random() * another_port.length)];
            if (err.code == 'EADDRINUSE')
                console.error(`${new Server().app.name} failed listening on the port ${err['port']}`);
            console.log(`${new Server().app.name} try listening on the port ${next}`);
            this.run(next);
        });
    }
}
export default App;
//# sourceMappingURL=app.js.map