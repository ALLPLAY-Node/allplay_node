import type { Request, Response, NextFunction } from "express";
export declare class FacilityController {
    private facilityService;
    createFacility: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    createFacilityReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFacilityReview: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFacility: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getFacilityList: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=facility.controller.d.ts.map