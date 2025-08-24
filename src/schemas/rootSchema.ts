import z from "zod";
import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { Types } from "mongoose";
extendZodWithOpenApi(z);

export const idSchema = z.object({
  id: z.string().refine((val) => zodRefiners.stringToObjectId(val), {
    message: "Invalid mongoose ID",
  }),
});

export const paginationQuery = z.object({
  skip: z
    .union([z.string(), z.number()])
    .transform((x) => Number(x))
    .pipe(z.number())
    .optional()
    .openapi({
      param: {
        name: "skip",
        in: "query",
        required: false,
      },
      type: "integer",
      example: 0,
    }),
  limit: z
    .union([z.string(), z.number()])
    .transform((x) => Number(x))
    .pipe(z.number())
    .optional()
    .openapi({
      param: {
        name: "limit",
        in: "query",
        required: false,
      },
      type: "integer",
      example: 10,
    }),
});

export const zodRefiners = {
  /**
   *
   * @param val string
   * @returns boolean
   * @description checks if a given string is a valid Mongoose ObjectId
   */
  stringToObjectId(val: string) {
    if (!val) return false;
    return Types.ObjectId.isValid(val);
  },

  /**
   *
   * @description checks if a given string is a valid time format
   *
   */
  matchTimeFormat(val: string) {
    return /^(0[1-9]|1[0-2]):[0-5][0-9] (am|pm)$/.test(val);
  },

  /**
   *
   * @description Password Regex
   *
   */

  passwordRegex(pw: string) {
    if (!pw) return false;
    if (pw.length < 8) return false;
    return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(pw) ? true : false;
  },
};

export const paginationQueryWithSort = paginationQuery.extend({
  sortBy: z
    .optional(
      z.enum(['asc', 'desc'] as const, {
        message: 'Please select an allowed type',
      })
    )
    .openapi({
      example: 'asc',
    }),
});
