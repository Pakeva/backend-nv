import { Router } from "express";
import { addNewShipping, getShipping } from "../controllers";
import { hasRol, validateFields, validateJwt } from "../middlewares";

const router = Router();

router.get("/", [
  validateJwt,

  validateFields
], getShipping);

router.post("/", [
  validateJwt,
  hasRol('CLIENT'),
  validateFields
], addNewShipping);

export default router;
