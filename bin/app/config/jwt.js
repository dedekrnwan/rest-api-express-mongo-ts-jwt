import 'dotenv/config';
class Jwt {
    constructor() {
        this.config = {
            secret: 'NpYBWYa2I3sS7',
            options: {
                issuer: 'Fractal',
                subject: 'noreply@fractal.com',
                audience: 'http://localhost/',
                expiresIn: "12h",
                algorithm: "RS256" // RSASSA [ "RS256", "RS384", "RS512" ]
            }
        };
    }
}
export default new Jwt().config;
//# sourceMappingURL=jwt.js.map