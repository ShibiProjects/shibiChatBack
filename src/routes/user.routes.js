import express from "express";
import {
  userDelete,
  userLogin,
  userRegister,
  userUpdate,
} from "../controller/user.controller.js";
import {
  validationRegister,
  validationLogin,
  validationCredentials,
  validationUpdate,
} from "../middleware/user.validation.js";

const router = express.Router();

router.post("/register", validationRegister, userRegister);
router.post("/login", validationLogin, validationCredentials, userLogin);

router.put("/update", validationUpdate, validationCredentials, userUpdate);

router.delete("/delete", validationLogin, validationCredentials, userDelete);

export default router;
