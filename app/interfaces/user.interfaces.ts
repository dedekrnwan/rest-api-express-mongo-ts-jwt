interface IUser {
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
    license_id?:string,
}

export default IUser