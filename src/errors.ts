import { StatusCodes } from "http-status-codes";

export class RegionNotFoundError extends Error {
  errorCode = "CLUB_REGION_NOT_FOUND";
  statusCode = StatusCodes.NOT_FOUND;
  reason: string;
  data: any;
  constructor(reason: string, data: any) {
    super("Region not found");
    this.reason = reason;
    this.data = data;
  }
}

export class SportNotFoundError extends Error {
  errorCode = "CLUB_SPORT_NOT_FOUND";
  statusCode = StatusCodes.NOT_FOUND;
  reason: string;
  data: any;
  constructor(reason: string, data: any) {
    super("Sport not found");
    this.reason = reason;
    this.data = data;
  }
}

export class FacilityAlreadyExistsError extends Error {
  errorCode = "FACILITY_ALREADY_EXISTS";
  statusCode = StatusCodes.BAD_REQUEST;
  reason: string;
  data: any;
  constructor(reason: string, data: any) {
    super("Facility already exists");
    this.reason = reason;
    this.data = data;
  }
}
