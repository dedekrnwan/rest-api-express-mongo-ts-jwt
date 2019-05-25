import * as mongoose from "mongoose";

interface UserInterface {
    email:string,
    username:string,
    name:string,
    birthdate:Date,
    password?:string,
    phone?:string,
    telephone?:string,
    address?:string,
    category?:string,
    email_verify_date?:Date,
    remember_token?:string,
    created_date?:Date,
    created_by_id?:string,
    updated_date?:Date,
    updated_by_id?:string
}

class User {
    public schema:mongoose.Schema
    public model:any
    constructor(){
        this.initSchema()
        this.initModel()
    }
    private initSchema(){
        this.schema = new mongoose.Schema({
            email:String,
            username:String,
            name:String,
            birthdate:Date,
            password:String,
            phone:String,
            telephone:String,
            address:String,
            category:String,
            email_verify_date:Date,
            remember_token:String,
            created_date:Date,
            created_by_id:String,
            updated_date:Date,
            updated_by_id:String
        })
    }
    public initModel(){
        this.model = mongoose.model('User', this.schema);
    }
}

export default new User().model