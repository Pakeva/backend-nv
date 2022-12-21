import { Router } from "express";
import { addNewShipping, getAllShippings, getShipping, updateShippingStatus } from "../controllers";
import { hasRol, validateFields, validateJwt } from "../middlewares";
import { check } from "express-validator";
import { isUserActive, userExists } from "../helpers";

const router = Router();

router.get("/:id", [
  validateJwt,
  check('id', 'Debe ser un id valido')
    .isMongoId(),
  validateFields
], getShipping);

router.put("/:id", [
  validateJwt,
  check('id', 'Debe ser un id valido')
    .isMongoId(),
  check('status', 'El estatus del pedido es requerido').notEmpty(),
  validateFields
], updateShippingStatus);

router.get("/", [
  validateJwt,
  validateFields
], getAllShippings);

router.post("/", [
  validateJwt,
  hasRol('CLIENT'),
  check('company', 'Debe ser un id valido').isMongoId()
    .custom(userExists)
    .custom(isUserActive),
  check('associated', 'Debe ser un id valido').isMongoId()
    .custom(userExists)
    .custom(isUserActive),
  validateFields
], addNewShipping);

export default router;
