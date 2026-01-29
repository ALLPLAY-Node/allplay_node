import { StatusCodes } from "http-status-codes";
export declare class InvalidFileNameError extends Error {
export declare class RegionNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class MissingRequiredParametersError extends Error {
    constructor(reason: string, data: any);
}
export declare class SportNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class InvalidOperationError extends Error {
    constructor(reason: string, data: any);
}
export declare class ClubNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
    constructor(reason: string, data: any);
}
export declare class ClubLeaderNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class ClubNotAuthorizedError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class AlreadyAppliedError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class JoinRequestNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class AlreadyClubLeaderError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class NotClubUserError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
//# sourceMappingURL=errors.d.ts.map