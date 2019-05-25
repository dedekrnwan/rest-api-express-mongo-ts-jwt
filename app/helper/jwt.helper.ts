import * as jwt from "jsonwebtoken";
import * as fs from "fs";
import jwtConfig from "./../config/jwt";

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

class Jwt {
    public data:any
    private private:string
    private public:string
    public options:OptionsInterface
    constructor(data:any, $options?:OptionsInterface) {
        this.data = data
        //key
        this.key()
        if(!$options){
            this.options = jwtConfig.options
        }else{
            this.options.issuer = ($options.issuer) ? $options.issuer : this.options.issuer;
            this.options.subject = ($options.subject) ? $options.subject : this.options.subject;
            this.options.audience = ($options.audience) ? $options.audience : this.options.audience;
            this.options.expiresIn = ($options.expiresIn) ? $options.expiresIn : this.options.expiresIn;
            this.options.algorithm = ($options.algorithm) ? $options.algorithm : this.options.algorithm;
        }
       
    }
    private key(){
        try {
            this.private = fs.readFileSync(`${__dirname}/../utils/private.key`, 'utf-8')
            this.public = fs.readFileSync(`${__dirname}/../utils/public.key`, 'utf-8')
        } catch (error) {
            console.log(`error reading key: `, error)
            throw error
        }
    }
    public async sign(){
        // Token signing options
        let option = <OptionsInterface> {
            issuer:  this.options.issuer,
            subject:  this.options.subject,
            audience:  this.options.audience,
            expiresIn:  "30d",    // 30 days validity
            algorithm:  "RS256"    
        };
        console.log([
            this.data, 
            this.private,
            option
        ])
        return await jwt.sign(
            this.data, 
            this.private,
            option
        );
    }
    public async verify(){
        let option = <OptionsInterface> {
            issuer:  this.options.issuer,
            subject:  this.options.subject,
            audience:  this.options.audience,
            expiresIn:  "30d",
            algorithm:  ["RS256"]
        };
        console.log([
            this.data, 
            this.public,
            option
        ])
        return await jwt.verify(
            this.data, 
            this.public,
            option
        );
    }
    public async decode(){
        return await jwt.decode(
            this.data, 
            {
                complete: true
            }
        );
    }
}

export default Jwt