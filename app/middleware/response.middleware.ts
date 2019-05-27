import * as express from "express";
import { IResponse } from "./../interfaces/response.interface";

export default (retur: any, request: express.Request, response: express.Response, next: express.NextFunction) => {
    response.status(retur.meta.status).json(<IResponse> retur);
}