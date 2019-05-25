export const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};
//# sourceMappingURL=logger.middleware.js.map