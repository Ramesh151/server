import { Router } from "express";
import {
  addProperties,
  getProperties,
} from "../controllers/propatie.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addproperty").post(upload.single("images"), addProperties);
router.route("/getproperty").get(getProperties);
export default router;
