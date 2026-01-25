import { StatusCodes } from "http-status-codes";
export declare class RegionNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class SportNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class FacilityAlreadyExistsError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class FailToAddReviewError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class FacilityNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
//# sourceMappingURL=errors.d.ts.map