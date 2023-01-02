import { Router } from "express";
import { hasRol, validateFields, validateJwt } from "../middlewares";
import { check } from "express-validator";
import { isUserActive, userExists } from "../helpers";
import { addNewUserShipping } from "../controllers";

const router = Router();

// router.get("/:id", [
//   validateJwt,
//   check('id', 'Debe ser un id valido')
//     .isMongoId(),
//   validateFields
// ], getShipping);
//
// router.put("/:id", [
//   validateJwt,
//   check('id', 'Debe ser un id valido')
//     .isMongoId(),
//   check('status', 'El estatus del pedido es requerido').notEmpty(),
//   validateFields
// ], updateShippingStatus);
//
// router.get("/", [
//   validateJwt,
//   validateFields
// ], getAllShippings);

router.post("/", [
  validateJwt,
  hasRol('FINAL_USER'),
  check('company', 'Debe ser un id valido').isMongoId()
    .custom(userExists)
    .custom(isUserActive),
  check('user', 'Debe ser un id valido').isMongoId()
    .custom(userExists)
    .custom(isUserActive),
  check('description', 'La descripcion es requerida')
    .notEmpty(),
  check('products', 'Debes agregar al menos un producto')
    .notEmpty(),
  validateFields
], addNewUserShipping);

export default router;
