// 임시 미들웨어
export const isLogin = (req, res, next) => {
    req.user = { id: 2 };
    next();
};
//# sourceMappingURL=auth.js.map