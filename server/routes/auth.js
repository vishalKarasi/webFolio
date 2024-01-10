import { Router } from "express";
import { login, refresh, logout } from "../controllers/auth.js";
import { ImgParser } from "../middlewares/multer.js";

const router = Router();

router.post("/login", ImgParser.none(), login);
router.post("/logout", logout);
router.get("/refresh", refresh);

export default router;
