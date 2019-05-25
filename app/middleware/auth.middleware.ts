import jwtHelper from "./../helper/jwt.helper";

class Jwt {
    constructor(){

    }

    public async authenticated(req, res, next){
        try {
             //get the token from the header if present
            let token = req.headers["x-api-key"] || req.headers["authorization"];
            //if no token found, return response (without going to the next middelware)
            if (!token)   
                return res.status(401).json({
                    response: false,
                    message: "Access denied. No token provided.",
                    data: req.body
                });
            //if can verify the token, set req.user and pass to next middleware
            token = token.replace('Bearer ','');
            let Jwt_Helper = new jwtHelper(token);
            const decoded = await Jwt_Helper.verify();
            req.user = decoded;
            next();
        } catch (error) {
            next(error)
        }
    }
}

export { Jwt }