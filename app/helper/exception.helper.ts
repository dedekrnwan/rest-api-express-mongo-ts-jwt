import { IResponse, IMeta } from "./../interfaces/response.interface";

interface Error {
  status:number,
  message:string
}
class Exception extends Error {
    public meta:IMeta
    public data:any
    constructor(error: Error) {
      super(error.message);
      this.meta = {
        response: false,
        status: error.status || 500,
        message: error.message,
        timestamp: new Date()
      }
      this.data = {
        error : error
      }
    }
  }
   
  export default Exception;