class Exception extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.message = message;
    }
}
export default Exception;
//# sourceMappingURL=exception.helper.js.map