import express from "express";
import { Project } from "../models/project.js";
import { ImgParser } from "../middlewares/multer.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  getOne,
  getAll,
  createOne,
  updateOne,
  deleteOne,
} from "../controllers/admin.js";

const router = express.Router();

router.get("/", getAll(Project));
router.get("/:id", getOne(Project));
router.post("/", verifyToken, ImgParser.single("image"), createOne(Project));
router.put("/:id", verifyToken, ImgParser.single("image"), updateOne(Project));
router.delete("/:id", verifyToken, deleteOne(Project));

export default router;
