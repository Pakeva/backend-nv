import { Router } from "express";
import { hasRol, validateFields, validateJwt } from "../middlewares";
import { check } from "express-validator";
import { getCompanyInfo, setInitialCompanyInfo, updateCompanyInfo } from "../controllers/companies";

const router = Router();

router.post("/", [
  validateJwt,
  hasRol('CLIENT'),
  check('name', 'El nombre es requerido').notEmpty(),
  check('description', 'La descripcion es requerida').notEmpty(),
  validateFields
], setInitialCompanyInfo);

router.put("/:id", [
  validateJwt,
  hasRol('CLIENT'),
  check('id', 'Debe ser un id valido')
    .isMongoId(),
  check('name', 'El nombre es requerido').notEmpty(),
  check('description', 'La descripcion es requerida').notEmpty(),
  validateFields
], updateCompanyInfo);

router.get("/", [
  validateJwt,
  validateFields
], getCompanyInfo);

export default router;
