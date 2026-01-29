import { Router } from "express";
import { createFacility, createFacilityReview, getFacilityReview, getFacility, getFacilityList, } from "../controllers/facility.controller.js";
import { isLogin } from "../middleware/auth.js";
const router = Router();
router.get("/facilities", getFacilityList);
router.get("/facilities/:facilityId/reviews", getFacilityReview);
router.get("/facilities/:facilityId", getFacility);
router.post("/facilities", isLogin, createFacility);
router.post("/facilities/:facilityId/review", isLogin, createFacilityReview);
export default router;
//# sourceMappingURL=facility.routes.js.map