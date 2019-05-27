import * as mongoose from "mongoose";
class License {
    constructor() {
        this.name = 'License';
        this.schema = new mongoose.Schema({
            license_name: String,
            description: String,
            license_key: String,
            url: String,
            created_date: {
                type: Date,
                "default": Date.now
            },
            created_by_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                "default": null
            },
            updated_date: {
                type: Date,
                "default": Date.now
            },
            updated_by_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users',
                "default": null
            },
            terms_and_conditions_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'terms_and_conditions',
                "default": null
            },
            authority_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'authority',
                "default": null
            },
        });
        this.model = mongoose.model(this.name, this.schema);
    }
}
export default new License().model;
//# sourceMappingURL=license.model.js.map