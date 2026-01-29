export const mockAuthMiddleware = (req, res, next) => {
    // 임시로 관리자/사용자 ID를 1번으로 고정, isLogin 구현 후 삭제
    req.user = {
        id: 1,
    };
    next();
};
//# sourceMappingURL=mock-auth.middleware.js.map