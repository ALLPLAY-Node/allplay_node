import type { Request, Response, NextFunction } from "express";
export declare class ClubController {
    private clubService;
    clubAdd: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    clubUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getClubs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getClub: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    clubJoin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getJoinRequests: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    approveJoinRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    leaveClub: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=club.controller.d.ts.map