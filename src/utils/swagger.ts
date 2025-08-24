import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from "@asteasolutions/zod-to-openapi";
import { genericRequestBody } from "./requestResponse";
import {
  createComboSchema,
  getComboQuery,
} from "../schemas/foodSchema/request";
import {
  createComboRes,
  getComboRes,
  getSingleComboRes,
} from "../schemas/foodSchema/response";
import z from "zod";
import {
  signInSchema,
  signUpSchema,
  userResponse,
} from "../schemas/userSchema";
import { idSchema } from "../schemas/rootSchema";

const registry = new OpenAPIRegistry();

// Auth
// Sign up user
registry.registerPath({
  method: "post",
  path: "/api/users/signup",
  tags: ["Auth"],
  description: "User signup endpoint",
  request: {
    body: genericRequestBody(signUpSchema),
  },
  responses: {
    200: {
      description: "User signed up successfully",
      content: {
        "application/json": {
          schema: userResponse,
        },
      },
    },
    400: { description: "Invalid credentials" },
  },
});

// Sign in user
registry.registerPath({
  method: "post",
  path: "/api/users/signin",
  tags: ["Auth"],
  description: "User login endpoint",
  request: {
    body: genericRequestBody(signInSchema),
  },
  responses: {
    200: {
      description: "User signed in successfully",
      content: {
        "application/json": {
          schema: userResponse,
        },
      },
    },
    400: { description: "Invalid credentials" },
  },
});

// Combos
// Create Combo
registry.registerPath({
  method: "post",
  path: "/api/food/combo/create",
  tags: ["Food"],
  description: "Create a food combo",
  security: [{ authenticate: [] }],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: createComboSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Combo created successfully",
      content: {
        "application/json": {
          schema: createComboRes,
        },
      },
    },
    500: { description: "Internal server error" },
  },
});

// Get All Combos (paginated)
registry.registerPath({
  method: "get",
  path: "/api/food/combo",
  tags: ["Food"],
  description: "Get food combos",
  request: {
    query: getComboQuery,
  },
  responses: {
    200: {
      description: "Food combos retrieved successfully",
      content: {
        "application/json": {
          schema: getComboRes,
        },
      },
    },
    404: {
      description: "No combos found",
    },
    500: { description: "Internal server error" },
  },
});

// Get combo By Id
registry.registerPath({
  method: "get",
  path: "/api/food/combo/{id}",
  tags: ["Food"],
  description: "Get food combo by ID",
  request: {
    params: idSchema,
  },
  responses: {
    200: {
      description: "Food combo retrieved successfully",
      content: {
        "application/json": {
          schema: getSingleComboRes,
        },
      },
    },
    400: {
      description: "Invalid combo ID",
    },
    500: { description: "Internal server error" },
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
  // components: {
  //   securitySchemes: {
  //     bearerAuth: {
  //       type: "http",
  //       scheme: "bearer",
  //       bearerFormat: "JWT",
  //     },
  //   },
  // },
});
