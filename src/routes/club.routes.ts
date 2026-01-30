import express from "express";
import { ClubController } from "../controllers/club.controller.js";
import { isLogin } from "../middleware/auth.js";
const router = express.Router();

const clubController = new ClubController();

router.get("/clubs", clubController.getClubs);

router.get("/clubs/:clubId", clubController.getClub);

router.get(
  "/clubs/:clubId/join-requests",
  isLogin,
  clubController.getJoinRequests,
);

router.post("/clubs", isLogin, clubController.clubAdd);

router.post("/clubs/:clubId/join", isLogin, clubController.clubJoin);

router.post(
  "/clubs/:clubId/join-requests/:requestId",
  isLogin,
  clubController.approveJoinRequest,
);

router.put("/clubs/:clubId", isLogin, clubController.clubUpdate);

router.delete("/clubs/:clubId/join", isLogin, clubController.leaveClub);

export default router;
