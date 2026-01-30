import { Router } from "express";
import { FacilityController } from "../controllers/facility.controller.js";
import { isLogin } from "../middleware/auth.js";

const router = Router();

const facilityController = new FacilityController();

router.get("/facilities", facilityController.getFacilityList);

router.get(
  "/facilities/:facilityId/reviews",
  facilityController.getFacilityReview,
);

router.get("/facilities/:facilityId", facilityController.getFacility);

router.post("/facilities", isLogin, facilityController.createFacility);

router.post(
  "/facilities/:facilityId/review",
  isLogin,
  facilityController.createFacilityReview,
);

export default router;
