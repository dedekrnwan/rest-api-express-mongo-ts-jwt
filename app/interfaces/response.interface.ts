
interface IMeta {
    response:boolean,
    message:string,
    timestamp:Date
}
interface IResponse {
    meta:IMeta,
    data:any
}

export { IResponse, IMeta }