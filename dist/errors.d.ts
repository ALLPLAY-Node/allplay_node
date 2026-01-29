import { StatusCodes } from "http-status-codes";
export declare class InvalidFileNameError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class RegionNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class MissingRequiredParametersError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
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
export declare class ClubNotFoundError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
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
export declare class FailToAddReviewError extends Error {
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
export declare class FacilityNotFoundError extends Error {
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
export declare class IdInvalidError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class InvalidOperationError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(message: string, data: any);
}
export declare class NotClubUserError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
export declare class ClubLeaderCannotLeaveError extends Error {
    errorCode: string;
    statusCode: StatusCodes;
    reason: string;
    data: any;
    constructor(reason: string, data: any);
}
//# sourceMappingURL=errors.d.ts.map