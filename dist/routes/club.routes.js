import express from "express";
import { handleClubAdd } from "../controllers/club.controller.js";
import { isLogin } from "../middleware/auth.js";
import { handleClubUpdate } from "../controllers/club.controller.js";
const router = express.Router();
router.post("/clubs", isLogin, handleClubAdd);
router.put("/clubs/:clubId", isLogin, handleClubUpdate);
export default router;
//# sourceMappingURL=club.routes.js.map