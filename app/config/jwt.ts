import 'dotenv/config'

interface JwtInterface {
    secret: string,
    options:OptionsInterface
}
interface OptionsInterface{
    issuer:  string,
    subject:  string,
    audience:  string,
    expiresIn:  string,
    algorithm:  any   // RSASSA [ "RS256", "RS384", "RS512" ]
}

class Jwt 
{
    public config:JwtInterface
    constructor(){
        this.config = <JwtInterface> {
            secret: 'NpYBWYa2I3sS7',
            options: <OptionsInterface> {
                issuer:  'Fractal',
                subject:  'noreply@fractal.com',
                audience:  'http://localhost/',
                expiresIn:  "12h",
                algorithm:  "RS256"   // RSASSA [ "RS256", "RS384", "RS512" ]
            }
        }
    }
}

export default new Jwt().config