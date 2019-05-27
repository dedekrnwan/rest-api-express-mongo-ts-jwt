class HResponse {
    constructor() {
    }
    //#region 2**
    ok(message = `Ok`, data) {
        return this.build(true, 200, message, data);
    }
    created(message = `Data Created`, data) {
        return this.build(true, 201, message, data);
    }
    accepted(message = `Accepted`, data) {
        return this.build(true, 202, message, data);
    }
    noContent(message = `No Content`, data) {
        return this.build(false, 204, message, data);
    }
    //#endregion
    //#region 4**
    badRequest(message = `Bad Request`, data) {
        return this.error(false, 400, message, data);
    }
    forbidden(message = `Forbidden`, data) {
        return this.error(false, 403, message, data);
    }
    notAcceptable(message = `Not Acceptable`, data) {
        return this.error(false, 406, message, data);
    }
    conflict(message = `Conflict`, data) {
        return this.error(false, 409, message, data);
    }
    unAuthorized(message = `Unauthorized`, data) {
        return this.error(false, 401, message, data);
    }
    notFound(message = `Data not found`, data) {
        return this.error(false, 404, message, data);
    }
    unProcessableEntity(message = `Unprocessable Entity`, data) {
        return this.error(false, 422, message, data);
    }
    //#endregion
    //#region 5**
    internalServerError({ message = 'Internal Server Error', data }) {
        return this.error(false, 500, message, data);
    }
    serviceUnAvailable({ message = 'Service Unavailable', data }) {
        return this.error(false, 503, message, data);
    }
    notImplemented({ message = 'Not Implemented', data }) {
        return this.error(false, 501, message, data);
    }
    badGateway({ message = 'Bad Gateway', data }) {
        return this.error(false, 501, message, data);
    }
    unknownError({ message = 'Unknown Error', data }) {
        return this.error(false, 505, message, data);
    }
    //#endregion
    //#region general
    build(response = true, status = 200, message, data) {
        return {
            meta: {
                response: response,
                status: status,
                message: message,
                timestamp: new Date()
            },
            data: data
        };
    }
    error(response = false, status = 500, message, data) {
        return {
            meta: {
                response: response,
                status: status,
                message: message,
                timestamp: new Date()
            },
            data: data
        };
    }
}
export default HResponse;
//# sourceMappingURL=response.helper.js.map