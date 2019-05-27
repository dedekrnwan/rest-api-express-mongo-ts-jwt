interface ILicense {
    license_name:string,
    license_key:string,
    description?:string,
    url?:string,
    created_date?:Date,
    created_by_id?:string,
    updated_date?:Date,
    updated_by_id?:string,
    terms_and_conditions_id?:string,
    authority_id?:string,
}

export default ILicense