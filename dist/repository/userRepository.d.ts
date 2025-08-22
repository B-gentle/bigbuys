import { SignUpReq } from "../schemas/userSchema";
export declare const userRepo: {
    /**
     * Find a user by email
     */
    findByEmail(email: string): Promise<(import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        role: import("../commons/types").Roles;
        email: string;
        password: string;
        name: string;
    }, {}, {
        timestamps: true;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        role: import("../commons/types").Roles;
        email: string;
        password: string;
        name: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    /**
     * Create a new user document
     */
    create(payload: SignUpReq): Promise<import("mongoose").Document<unknown, {}, {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        role: import("../commons/types").Roles;
        email: string;
        password: string;
        name: string;
    }, {}, {
        timestamps: true;
    }> & {
        createdAt: NativeDate;
        updatedAt: NativeDate;
    } & {
        role: import("../commons/types").Roles;
        email: string;
        password: string;
        name: string;
    } & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
};
//# sourceMappingURL=userRepository.d.ts.map