import 'dotenv/config'
import App from './../../lib/app';

interface AppInterface{
    name:string,
    port:number,
    env:string,
    another_port?:number[]
}

class Server 
{
    public app:AppInterface
    constructor(){
        this.app = <AppInterface> {
            name: 'Fractal',
            port: 3000,
            env: 'development',
            another_port: [8080, 80, 3000, 4000, 5000]
        }
    }
}

export default Server