import { StatusCodes } from "http-status-codes";
export declare class InvalidFileNameError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class MissingRequiredParametersError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class InvalidOperationError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
//# sourceMappingURL=errors.d.ts.map