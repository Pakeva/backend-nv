import {Router} from "express";
import {createProduct, deleteProduct, getProduct, getProducts, updateProduct} from "../controllers";
import {hasRol, validateFields, validateJwt} from "../middlewares";
import {check} from "express-validator";
import {productExists} from "../helpers";

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


router.get('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(productExists),
    validateFields
], getProduct)

router.put('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(productExists),
    hasRol('SUPER_ADMIN', 'ASSOCIATED', 'CLIENT'),
    validateFields
], updateProduct)

router.delete('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(productExists),
    hasRol('SUPER_ADMIN', 'ASSOCIATED', 'CLIENT'),
    validateFields
], deleteProduct)

export default router;