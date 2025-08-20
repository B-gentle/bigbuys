"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSuccessResponse = exports.genericRequestBody = void 0;
const genericRequestBody = (schema) => {
    return {
        content: {
            "application/json": {
                schema,
            },
        },
    };
};
exports.genericRequestBody = genericRequestBody;
const defaultSuccessResponse = (data, description = "Request successful") => {
    return {
        description,
        content: {
            "application/json": {
                data,
            },
        },
    };
};
exports.defaultSuccessResponse = defaultSuccessResponse;
//# sourceMappingURL=requestResponse.js.map