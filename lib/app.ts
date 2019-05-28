import * as express from "express";
import * as bodyparser from "body-parser";
import * as morgan from "morgan";
import Database from "./../app/config/database";
import Server from "./../app/config/server";
import * as cors from "cors";
import Routes from "./../app/routes/routes";
import HException from "./../app/helper/exception.helper";
import MResponse from "./../app/middleware/response.middleware";
import HResponse from "./../app/helper/response.helper";

interface Error {
    status?: number;
    message?: string;
    code?:string;
}

class App {
    public app:express.Application
    public port:number
    constructor() {
        this.app = express()
        this.middleware()
        this.routes(new Routes().routes)
        this.connection()
    }

    private middleware(){
        this.app.use(cors())
        this.app.use(morgan('dev'))
        this.app.use(bodyparser.urlencoded({
            extended: true  
        }))
        this.app.use(bodyparser.json())
    }
    private routes(routes){
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
        //404 handler
        this.app.use((req, res, next) => {
            next(new HResponse().notFound(`Not Found`,{}));
        })
        //error handler
        
        //repsonse handler
        this.app.use(MResponse)
    }
    private connection(){
        const database = new Database();
        database.connection().fractal();
    }
    
    public run(port:number){
        this.app.listen(port, () => {
            console.log(`${new Server().app.name} listening on the port ${port}`)
        }).on('error' , (err:Error) => {
            let another_port = [8080, 80, 3000, 4000, 5000]; 
            let next = another_port[Math.floor(Math.random() * another_port.length)];
            if(err.code == 'EADDRINUSE')
                console.error(`${new Server().app.name} failed listening on the port ${err['port']}`)
                console.log(`${new Server().app.name} try listening on the port ${next}`)
                this.run(next)

        })
    }
}

export default App