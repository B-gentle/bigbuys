"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openApiSpec = void 0;
const zod_to_openapi_1 = require("@asteasolutions/zod-to-openapi");
const userSchema_1 = require("../schemas/userSchema");
const requestResponse_1 = require("./requestResponse");
const registry = new zod_to_openapi_1.OpenAPIRegistry();
registry.registerPath({
    method: "post",
    path: "/api/users/signin",
    tags: ["Auth"],
    description: "User login endpoint",
    request: {
        body: (0, requestResponse_1.genericRequestBody)(userSchema_1.signInSchema)
    },
    responses: {
        200: {
            description: "User signed in successfully",
            content: {
                "application/json": {
                    schema: userSchema_1.userResponse
                }
            }
        },
        400: { description: "Invalid credentials" },
    },
});
registry.registerPath({
    method: "post",
    path: "/api/users/signup",
    tags: ["Auth"],
    description: "User signup endpoint",
    request: {
        body: (0, requestResponse_1.genericRequestBody)(userSchema_1.signUpSchema)
    },
    responses: {
        200: {
            description: "User signed up successfully",
            content: {
                "application/json": {
                    schema: userSchema_1.userResponse
                }
            }
        },
        400: { description: "Invalid credentials" },
    },
});
// Generate OpenAPI spec
const generator = new zod_to_openapi_1.OpenApiGeneratorV3(registry.definitions);
exports.openApiSpec = generator.generateDocument({
    openapi: "3.0.0",
    info: {
        title: "BigBuys",
        version: "1.0.0",
        description: "API documentation for the Food ordering app",
    },
    servers: [{ url: "http://localhost:5000" }],
    security: [{ authorize: [] }],
});
//# sourceMappingURL=swagger.js.map