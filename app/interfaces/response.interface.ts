
interface IMeta {
    response:boolean,
    status:number,
    message:string,
    timestamp:Date
}
interface IResponse {
    meta:IMeta,
    data:any
}

export { IResponse, IMeta }