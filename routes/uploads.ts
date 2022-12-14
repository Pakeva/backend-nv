import { Router } from "express";
import { getImage, updateImage } from "../controllers";
import { check } from "express-validator";
import { validateFields, validateJwt } from "../middlewares";

const router = Router();

router.put('/:collection/:id', [
  validateJwt,
  check('id', 'Debe ser un mongo id valido').isMongoId(),
  validateFields
], updateImage);

router.get('/:collection/:id', getImage)



export default router;
