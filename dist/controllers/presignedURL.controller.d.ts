import type { Request, Response, NextFunction } from "express";
export declare class PresignedURLController {
    private presignedURLService;
    handlePresignedURL: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=presignedURL.controller.d.ts.map