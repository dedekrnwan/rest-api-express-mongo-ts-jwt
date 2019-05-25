import * as mongoose from "mongoose";
import 'dotenv/config';
class Database {
    constructor() {
        this.config();
    }
    config() {
        this.database = {
            fractal: {
                url: `${process.env.FRACTAL_DEFAULT_URL}:${process.env.FRACTAL_DEFAULT_PORT}/${process.env.FRACTAL_DEFAULT_SCHEMA}`,
                port: parseInt(process.env.FRACTAL_DEFAULT_PORT),
                schema: process.env.FRACTAL_DEFAULT_SCHEMA,
            }
        };
    }
    connection() {
        return {
            fractal: () => {
                mongoose.connect(this.database.fractal.url, { useNewUrlParser: true });
                mongoose.connection.on('connected', () => {
                    console.log(`Mongoose ${this.database.fractal.schema} connection is open to ${this.database.fractal.url}`);
                });
                mongoose.connection.on('error', (error) => {
                    console.log(`Mongoose ${this.database.fractal.schema} connection at ${this.database.fractal.url} has occured ${error} error`);
                });
                mongoose.connection.on('disconnected', () => {
                    console.log(`Mongoose ${this.database.fractal.schema} connection at ${this.database.fractal.url} is disconnected`);
                });
                // process.on('SIGINT', function(){
                //     mongoose.connection.close(function(){
                //         console.log(`Mongoose ${this.database.fractal.schema} connection is disconnected due to application termination`);
                //         process.exit(0)
                //     });
                // });
            }
        };
    }
}
export default Database;
//# sourceMappingURL=database.js.map