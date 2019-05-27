export default (retur, request, response, next) => {
    response.status(retur.meta.status).json(retur);
};
//# sourceMappingURL=response.middleware.js.map