import { StatusCodes } from "http-status-codes";
export class InvalidFileNameError extends Error {
    errorCode = "PRESIGNED_URL_FILE_NAME_ERROR";
    statusCode = StatusCodes.BAD_REQUEST;
    reason;
    data;
    constructor(message, data) {
        super(message);
        this.name = "InvalidFileNameError";
        this.reason = message;
        this.data = data;
    }
}
export class MissingRequiredParametersError extends Error {
    errorCode = "PRESIGNED_URL_MISSING_REQUIRED_PARAMETERS_ERROR";
    statusCode = StatusCodes.BAD_REQUEST;
    reason;
    data;
    constructor(message, data) {
        super(message);
        this.name = "MissingRequiredParametersError";
        this.reason = message;
        this.data = data;
    }
}
export class InvalidOperationError extends Error {
    errorCode = "PRESIGNED_URL_INVALID_OPERATION_ERROR";
    statusCode = StatusCodes.BAD_REQUEST;
    reason;
    data;
    constructor(message, data) {
        super(message);
        this.name = "InvalidOperationError";
        this.reason = message;
export class RegionNotFoundError extends Error {
    errorCode = "CLUB_REGION_NOT_FOUND";
    statusCode = StatusCodes.NOT_FOUND;
    reason;
    data;
    constructor(reason, data) {
        super("Region not found");
        this.reason = reason;
        this.data = data;
    }
}
export class SportNotFoundError extends Error {
    errorCode = "CLUB_SPORT_NOT_FOUND";
    statusCode = StatusCodes.NOT_FOUND;
    reason;
    data;
    constructor(reason, data) {
        super("Sport not found");
        this.reason = reason;
        this.data = data;
    }
}
export class ClubNotFoundError extends Error {
    errorCode = "CLUB_NOT_FOUND";
    statusCode = StatusCodes.NOT_FOUND;
    reason;
    data;
    constructor(reason, data) {
        super("Club not found");
        this.reason = reason;
        this.data = data;
    }
}
export class ClubLeaderNotFoundError extends Error {
    errorCode = "CLUB_LEADER_NOT_FOUND";
    statusCode = StatusCodes.NOT_FOUND;
    reason;
    data;
    constructor(reason, data) {
        super("Club leader not found");
        this.reason = reason;
        this.data = data;
    }
}
export class ClubNotAuthorizedError extends Error {
    errorCode = "CLUB_NOT_AUTHORIZED";
    statusCode = StatusCodes.FORBIDDEN;
    reason;
    data;
    constructor(reason, data) {
        super("Club not authorized");
        this.reason = reason;
        this.data = data;
    }
}
export class AlreadyAppliedError extends Error {
    errorCode = "CLUB_ALREADY_APPLIED";
    statusCode = StatusCodes.CONFLICT;
    reason;
    data;
    constructor(reason, data) {
        super("Already applied");
        this.reason = reason;
        this.data = data;
    }
}
export class JoinRequestNotFoundError extends Error {
    errorCode = "CLUB_JOIN_REQUEST_NOT_FOUND";
    statusCode = StatusCodes.NOT_FOUND;
    reason;
    data;
    constructor(reason, data) {
        super("Join request not found");
        this.reason = reason;
        this.data = data;
    }
}
export class AlreadyClubLeaderError extends Error {
    errorCode = "CLUB_ALREADY_LEADER";
    statusCode = StatusCodes.CONFLICT;
    reason;
    data;
    constructor(reason, data) {
        super("Already club leader");
        this.reason = reason;
        this.data = data;
    }
}
export class NotClubUserError extends Error {
    errorCode = "CLUB_NOT_USER";
    statusCode = StatusCodes.BAD_REQUEST;
    reason;
    data;
    constructor(reason, data) {
        super("Not club user");
        this.reason = reason;
        this.data = data;
    }
}
//# sourceMappingURL=errors.js.map