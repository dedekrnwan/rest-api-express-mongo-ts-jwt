export default (retur, request, response, next) => {
    response.status(retur.meta.status || 500).json(retur);
};
//# sourceMappingURL=response.middleware.js.map