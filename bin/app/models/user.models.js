import * as mongoose from "mongoose";
class User {
    constructor() {
        this.initSchema();
        this.initModel();
    }
    initSchema() {
        this.schema = new mongoose.Schema({
            email: String,
            username: String,
            name: String,
            birthdate: Date,
            password: String,
            phone: String,
            telephone: String,
            address: String,
            category: String,
            email_verify_date: Date,
            remember_token: String,
            created_date: Date,
            created_by_id: String,
            updated_date: Date,
            updated_by_id: String
        });
    }
    initModel() {
        this.model = mongoose.model('User', this.schema);
    }
}
export default new User().model;
//# sourceMappingURL=user.models.js.map