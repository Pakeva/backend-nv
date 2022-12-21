import { Router } from "express";
import { hasRol, validateFields, validateJwt } from "../middlewares";
import { check } from "express-validator";
import { updateCompanyInfo } from "../controllers/companies";

const router = Router();

router.put("/:id", [
  validateJwt,
  hasRol('CLIENT'),
  check('id', 'Debe ser un id valido')
    .isMongoId(),
  check('img', 'La imagen es requerida').notEmpty(),
  check('name', 'El nombre es requerido').notEmpty(),
  check('description', 'La descripcion es requerida').notEmpty(),
  validateFields
], updateCompanyInfo);

export default router;
