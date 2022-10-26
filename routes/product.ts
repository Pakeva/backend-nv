import {Router} from "express";
import {createProduct, getProducts} from "../controllers";
import {hasRol, validateFields, validateJwt} from "../middlewares";
import {check} from "express-validator";

const router = Router();

router.get('', [
    validateJwt,
    validateFields
], getProducts)

router.post('/', [
    validateJwt,
    hasRol('SUPER_ADMIN', 'ASSOCIATED', 'CLIENT'),
    check('name', 'El nombre es requerido')
        .notEmpty()
        .isLength({min: 3}),
    check('price', 'El precio es requerido')
        .isNumeric()
        .notEmpty(),
    check('available', 'La disponibilidad es requerida')
        .notEmpty(),
    check('category', 'Debe ser un ID válido')
        .isMongoId(),
    validateFields,
], createProduct)

export default router;