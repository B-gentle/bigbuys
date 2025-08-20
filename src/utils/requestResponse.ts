import z, { ZodType } from "zod";

export const genericRequestBody = <TData extends ZodType>(schema: TData) => {
  return {
    content: {
      "application/json": {
        schema,
      },
    },
  };
};

export const defaultSuccessResponse = <TData extends ZodType>(
  data?: TData,
  description: string = "Request successful"
) => {
    return {
      description,
      content: {
        "application/json": {
          data,
        },
      },
    };
};
