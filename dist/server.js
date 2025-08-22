"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const logger_1 = require("./utils/logger");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./utils/swagger");
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./commons/env");
const PORT = env_1.env.PORT || 5000;
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
(0, db_1.default)();
const app = (0, express_1.default)();
// middlewares
app.use(logger_1.requestLogger);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/api/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.openApiSpec));
// routes
app.use("/api/users", userRoutes_1.default);
app.get("/", (_, res) => {
    res.send("Buy at bigbuys!");
});
// error handlers
app.use((req, _res, next) => {
    logger_1.logger.warn({
        event: "route_not_found",
        method: req.method,
        url: req.originalUrl,
        ip: req.ip,
        headers: {
            host: req.headers.host,
            referer: req.headers.referer,
            "user-agent": req.headers["user-agent"],
        },
    }, "Route not found");
    const err = new Error("Not Found");
    err.statusCode = 404;
    next(err);
});
app.use(errorHandler_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map