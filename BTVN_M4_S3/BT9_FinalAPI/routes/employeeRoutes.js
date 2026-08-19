import express from "express";
import * as employeeController from "../controllers/employeeController.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get("/", employeeController.getAllEmployees);
router.post("/", employeeController.createEmployee);
router.get("/:id", employeeController.getEmployeeById);

// upload.single('avatar') là middleware của Multer đặt trước controller
router.post(
  "/:id/avatar",
  upload.single("avatar"),
  employeeController.uploadAvatar,
);

export default router;
