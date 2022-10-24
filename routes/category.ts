import {Router} from 'express';
import {
    getCategory,
    getCategories,
    createCategory, updateCategory, deleteCategory
} from '../controllers'
import {hasRol, validateFields, validateJwt} from "../middlewares";
import {check} from "express-validator";
import {categoryExists} from "../helpers";


const router = Router();

router.get('/', [
    validateJwt,
    hasRol('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    validateFields
], getCategories)

router.get('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(categoryExists),
    hasRol('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    validateFields
], getCategory)

router.post('/', [
    validateJwt,
    check('name', 'El nombre de la categoría es requerido')
        .notEmpty()
        .isLength({min: 3, max: 50}),
    validateFields
], createCategory)

router.put('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(categoryExists),
    check('name', 'El nombre es requerido')
        .notEmpty()
        .isLength({min:3}),
    hasRol('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    validateFields
], updateCategory)

router.delete('/:id', [
    validateJwt,
    check('id', 'No es un id válido')
        .isMongoId()
        .custom(categoryExists),
    hasRol('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    validateFields
], deleteCategory)









export default router;