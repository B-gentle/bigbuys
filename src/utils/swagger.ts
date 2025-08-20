import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { authorize } from "../middlewares/authMiddleware";
import { signInSchema, signUpSchema, userResponse } from "../schemas/userSchema";
import { defaultSuccessResponse, genericRequestBody } from "./requestResponse";

const registry = new OpenAPIRegistry();

registry.registerPath({
  method: "post",
  path: "/api/users/signin",
  tags: ["Auth"],
  description: "User login endpoint",
  request: {
    body: genericRequestBody(signInSchema)
  },
  responses: {
    200: {
      description: "User signed in successfully",
      content: {
        "application/json": {
          schema: userResponse
        }
      }
    },
    400: { description: "Invalid credentials" },
  },
});

// Generate OpenAPI spec
const generator = new OpenApiGeneratorV3(registry.definitions);
export const openApiSpec = generator.generateDocument({
  openapi: "3.0.0",
  info: {
    title: "BigBuys",
    version: "1.0.0",
    description: "API documentation for the Food ordering app",
  },
  servers: [{ url: "http://localhost:5000" }],
  security: [{ authorize: [] }],
});