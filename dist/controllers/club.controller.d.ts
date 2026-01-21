import type { Request, Response, NextFunction } from "express";
export declare const handleClubAdd: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleClubUpdate: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleGetClubs: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleGetClub: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleClubJoin: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleGetJoinRequests: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleApproveJoinRequest: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const handleLeaveClub: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=club.controller.d.ts.map