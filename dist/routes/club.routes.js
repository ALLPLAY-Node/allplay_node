import express from "express";
import { handleGetClubs, handleGetClub, handleClubAdd, handleClubUpdate, handleClubJoin, handleGetJoinRequests, handleApproveJoinRequest, handleLeaveClub, } from "../controllers/club.controller.js";
import { isLogin } from "../middleware/auth.js";
const router = express.Router();
router.get("/clubs", handleGetClubs);
router.get("/clubs/:clubId", handleGetClub);
router.get("/clubs/:clubId/join-requests", isLogin, handleGetJoinRequests);
router.post("/clubs", isLogin, handleClubAdd);
router.post("/clubs/:clubId/join", isLogin, handleClubJoin);
router.post("/clubs/:clubId/join-requests/:requestId", isLogin, handleApproveJoinRequest);
router.put("/clubs/:clubId", isLogin, handleClubUpdate);
router.delete("/clubs/:clubId/join", isLogin, handleLeaveClub);
export default router;
//# sourceMappingURL=club.routes.js.map