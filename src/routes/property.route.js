import { Router } from "express";
import {
  addProperties,
  getProperties,
} from "../controllers/propatie.controller.js";

import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/addproperty").post(
  upload.fields([
    {
      name: "images",
      maxCount: 3,
    },
    {
      name: "videos",
      maxCount: 3,
    },
  ]),

  addProperties
);
router.route("/getproperty").get(getProperties);
export default router;
