import { Router } from "express";
import { createFacility } from "../controllers/facility.controller.js";
import { isLogin } from "../middleware/auth.js";
const router = Router();
router.post("/facilities", isLogin, createFacility);
export default router;
//# sourceMappingURL=facility.routes.js.map