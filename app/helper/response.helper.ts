import { IResponse } from "../interfaces/response.interface";
import { IMeta } from "../interfaces/response.interface";

class HResponse
{
    constructor(){
        
    }
    //#region 2**
    public ok(message: string = `Ok`, data: any):IResponse{
        return this.build(true, 200,message,data);
    }
    public created(message: string = `Data Created`, data: any):IResponse {
        return this.build(true, 201, message, data);
    }
    public accepted(message: string = `Accepted`, data: any):IResponse{
        return this.build(true, 202, message, data);
    }
    public noContent(message: string = `No Content`, data: any):IResponse{
        return this.build(false, 204, message, data);
    }
    //#endregion
    //#region 4**
    public badRequest(message: string = `Bad Request`, data: any):IResponse{
        return this.error(false, 400, message, data);
    }
    public forbidden(message: string = `Forbidden`, data: any):IResponse{
        return this.error(false, 403, message, data);
    }
    public notAcceptable(message: string = `Not Acceptable`, data: any):IResponse{
        return this.error(false, 406, message, data);
    }
    public conflict(message: string = `Conflict`, data: any):IResponse{
        return this.error(false, 409, message, data);
    }
    public unAuthorized(message: string = `Unauthorized`, data: any):IResponse{
        return this.error(false, 401, message, data);
    }
    public notFound(message: string = `Data not found`, data: any):IResponse{
        return this.error(false, 404, message, data);
    }
    public unProcessableEntity(message: string = `Unprocessable Entity`, data: any):IResponse{
        return this.error(false, 422, message, data);
    }
    //#endregion
    
    //#region 5**
    public internalServerError({ message = 'Internal Server Error', data }: { message: string; data: any; }):IResponse{
        return this.error(false, 500, message, data);
    }
    public serviceUnAvailable({ message = 'Service Unavailable', data }: { message: string; data: any; }):IResponse{
        return this.error(false, 503, message, data);
    }
    public notImplemented({ message = 'Not Implemented', data }: { message: string; data: any; }):IResponse{
        return this.error(false, 501, message, data);
    }
    public badGateway({ message = 'Bad Gateway', data }: { message: string; data: any; }):IResponse{
        return this.error(false, 501, message, data);
    }
    public unknownError({ message = 'Unknown Error', data }: { message: string; data: any; }):IResponse{
        return this.error(false, 505, message, data);
    }
    //#endregion
   
    //#region general
    public build(response:boolean  = true, status:number = 200, message:string, data:any):IResponse{
        return <IResponse> {
            meta: <IMeta> {
                response: response,
                status: status,
                message: message,
                timestamp: new Date()
            },
            data: data
        }
    }
    public error(response:boolean = false, status:number = 500, message:string, data:any):IResponse{
        return<IResponse> {
            meta: <IMeta> {
                response: response,
                status: status,
                message: message,
                timestamp: new Date()
            },
            data: data
        }
    }
    //#endregion
}

export default HResponse