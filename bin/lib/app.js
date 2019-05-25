import * as express from "express";
import * as bodyparser from "body-parser";
import * as morgan from "morgan";
import Database from "./../app/config/database";
import Server from "./../app/config/server";
class App {
    constructor(actions, port) {
        this.app = express();
        this.port = port;
        this.middleware();
        this.actions(actions);
        this.connection();
    }
    middleware() {
        this.app.use(morgan('dev'));
        this.app.use(bodyparser.urlencoded({
            extended: true
        }));
        this.app.use(bodyparser.json());
    }
    actions(actions) {
        actions.forEach(action => {
            this.app.use('/', action.router);
        });
        //404 handler
        this.app.use((req, res, next) => {
            let error = new Error('Not Found');
            error.status = 400;
            return next(error);
        });
        //error handler
        this.app.use((err, req, res, next) => {
            let error = this.app.get('env') == 'development' ? err : {};
            let status = err.status || 500;
            //Response to client
            res.status(status).json({
                response: false,
                message: error.message,
                data: {
                    message: error
                }
            });
            //Response to us
        });
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