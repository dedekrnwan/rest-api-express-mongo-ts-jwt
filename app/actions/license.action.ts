import * as express from "express";
import ILicense from "./../interfaces/license.interface";
import License from "./../models/license.model";
import HResponse from "./../helper/response.helper";
import HAuth from "./../helper/auth.helper";
import HException from "./../helper/exception.helper";

class LicenseAction
{
    public path = '/license'
    constructor(){

    }

    public async index(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let data = await License.find().exec();
            next(new HResponse().ok(
                'License has been retrieve',
                {
                    License: data,
                }
            ))
        } catch (error) {
            next(new HException(error))
        }
    }
    public async details(req: express.Request, res: express.Response, next: express.NextFunction) :Promise<any>{
        try {
            let data = await License.findById(req.params.id);
            if(data){
                next(new HResponse().ok(`License has been retrieve`,{ License: data }))
            }else{
                next(new HResponse().notFound('License not found', { License: data }))
            }
        } catch (error) {
            next(new HException(error))
        }
    }
    public async update(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let data:ILicense = req.body 
            data.updated_date = new Date()
            data.updated_by_id = (await new HAuth().user(req))._id
            data  = await License.findByIdAndUpdate(req.params.id, data)
            data = await License.findById(req.params.id)
            //handle transaction
            next(new HResponse().ok(`User successfully updated`,{ License: data }))
        } catch (error) {
            next(new HException(error))
        }
    }
    public async store(req: express.Request, res: express.Response, next: express.NextFunction):Promise<any>{
        try {
            let body:ILicense = req.body;
            body.created_date = new Date()
            body.created_by_id = (await new HAuth().user(req))._id
            body.updated_date = new Date()
            body.updated_by_id = (await new HAuth().user(req))._id
            let data = new License(body);
            data = await data.save();
            next(new HResponse().created(`User has been stored`,{ License: data }))
        } catch (error) {
            next(new HException(error))
        }
    }
    public async delete(req: express.Request, res: express.Response, next: express.NextFunction) :Promise<any>{
        try {
            let promise = License.findOneAndRemove(req.params.id)
            next(new HResponse().ok(`User successfully deleted`,{ License: promise }))
        } catch (error) {
            next(new HException(error))
        }
    }
}

export default LicenseAction    