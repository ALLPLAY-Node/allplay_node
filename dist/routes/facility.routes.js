import { Router } from "express";
import { createFacility, createFacilityReview, } from "../controllers/facility.controller.js";
import { isLogin } from "../middleware/auth.js";
const router = Router();
router.post("/facilities", isLogin, createFacility);
router.post("/facilities/:facilityId/review", isLogin, createFacilityReview);
export default router;
//# sourceMappingURL=facility.routes.js.map