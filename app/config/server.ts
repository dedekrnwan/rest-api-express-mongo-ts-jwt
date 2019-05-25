import 'dotenv/config'
import App from './../../lib/app';

interface AppInterface{
    name:string,
    port:number,
    env:string
}

class Server 
{
    public app:AppInterface
    constructor(){
        this.app = <AppInterface> {
            name: 'Fractal',
            port: 3000,
            env: 'development'
        }
    }
}

export default Server