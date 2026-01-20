import express from "express";
import { handleClubAdd } from "../controllers/club.controller.js";
import { isLogin } from "../middleware/auth.js";
import { handleClubUpdate } from "../controllers/club.controller.js";
import { handleClubJoin } from "../controllers/club.controller.js";
const router = express.Router();

router.post("/clubs", isLogin, handleClubAdd);

router.put("/clubs/:clubId", isLogin, handleClubUpdate);

router.post("/clubs/:clubId/join", isLogin, handleClubJoin);

export default router;
