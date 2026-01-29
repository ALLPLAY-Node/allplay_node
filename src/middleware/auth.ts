import type { NextFunction, Request, Response } from "express";
// 임시 미들웨어
export const isLogin = (req: Request, res: Response, next: NextFunction) => {
  req.user = { id: 3 };
  next();
};
