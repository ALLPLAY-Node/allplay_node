import { StatusCodes } from "http-status-codes";

export class InvalidFileNameError extends Error {
  errorCode = "PRESIGNED_URL_FILE_NAME_ERROR";
  statusCode = StatusCodes.BAD_REQUEST;
  reason: string;
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.name = "InvalidFileNameError";
    this.reason = message;
    this.data = data;
  }
}

export class MissingRequiredParametersError extends Error {
  errorCode = "PRESIGNED_URL_MISSING_REQUIRED_PARAMETERS_ERROR";
  statusCode = StatusCodes.BAD_REQUEST;
  reason: string;
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.name = "MissingRequiredParametersError";
    this.reason = message;
    this.data = data;
  }
}

export class InvalidOperationError extends Error {
  errorCode = "PRESIGNED_URL_INVALID_OPERATION_ERROR";
  statusCode = StatusCodes.BAD_REQUEST;
  reason: string;
  data: any;
  constructor(message: string, data: any) {
    super(message);
    this.name = "InvalidOperationError";
    this.reason = message;
    this.data = data;
  }
}
