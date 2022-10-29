import {Router} from "express";
import {createProduct, deleteProduct, getProduct, getProductsByCategoryId, updateProduct} from "../controllers";
import {hasRol, validateFields, validateJwt} from "../middlewares";
import {check} from "express-validator";
import {categoryExists, productExists} from "../helpers";

const router = Router();

router.get('/:catId', [
    validateJwt,
    check('catId', 'No es un id válido')
        .isMongoId()
        .custom(categoryExists),
    validateFields
], getProductsByCategoryId)

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


router.get('/product/:id', [
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