import { ZodType } from "zod";
export declare const genericRequestBody: <TData extends ZodType>(schema: TData) => {
    content: {
        "application/json": {
            schema: TData;
        };
    };
};
export declare const defaultSuccessResponse: <TData extends ZodType>(data?: TData, description?: string) => {
    description: string;
    content: {
        "application/json": {
            data: TData | undefined;
        };
    };
};
//# sourceMappingURL=requestResponse.d.ts.map