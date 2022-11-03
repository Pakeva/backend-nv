import express from 'express';
import {hasRol, isAdminRol, validateFields, validateJwt} from "../middlewares";
import {check} from "express-validator";

import {createUser, deleteUser, getUser, getUserByBondingCode, getUsers, updateUser} from '../controllers'
import {bondingCodeExists, emailExists, isUserActive, isValidRol, userExists} from "../helpers";

const router = express.Router();

router.post('/', [
    check('rol', 'El rol es requerido')
        .notEmpty()
        // .isIn(['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'])
        .withMessage('No es un rol válido')
        .custom(isValidRol),
    check('name', 'El nombre es requerido')
        .isLength({min: 2})
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    check('firstLastName', 'El apellido es requerido')
        .isLength({min: 2})
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    check('birthday', 'La fecha de nacimiento es requerida')
        .isDate(),
    check('genre', 'El género es requerido')
        .isIn(['M', 'F', 'NB'])
        .withMessage('Debe ser un género válido (M-F-NB)')
        .notEmpty(),
    check('email', 'El email es requerido')
        .isEmail()
        .withMessage('El formato tiene que ser correcto')
        .custom(emailExists)
        .notEmpty(),
    check('phone')
        .isNumeric()
        .isLength({min:5})
        .withMessage('Solo se aceptan números')
        .notEmpty(),
    check('password', 'La constraseña es requerida')
        .isLength({min: 6})
        .withMessage('Al menos 6 carácteres')
        .notEmpty(),
    check('zip', 'El código postal es requerido')
        .isNumeric()
        .isLength({min:5, max: 5})
        .withMessage('Solo se aceptan números')
        .notEmpty(),
    check('state', 'El estado es requerido')
        .notEmpty(),
    check('municipality', 'El municipio es requerido')
        .notEmpty(),
    check('colony', 'La colonia es requerida')
        .notEmpty(),
    check('street', 'La calle es requerida')
        .notEmpty(),
    validateFields
], createUser)

router.get('/', [
    validateJwt,
    isAdminRol,
    validateFields
], getUsers)

router.get('/:id', [
    validateJwt,
    hasRol('CLIENT', 'SUPER_ADMIN', 'ASSOCIATED'),
    check('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(userExists),
    validateFields
], getUser);

router.delete('/:id', [
    validateJwt,
    //isAdminRole
    check('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(userExists)
        .custom(isUserActive),
    validateFields
], deleteUser)


router.put('/:id', [
    validateJwt,
    check('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(userExists),
    validateFields
], updateUser)


router.get('/bonding/:bc', [
    validateJwt,
    check('bc', 'No es un codigo valido')
        .custom(bondingCodeExists),
    validateFields
], getUserByBondingCode);


export default router;










