import express from 'express';
import {validateFields} from "../middlewares";
import {check} from "express-validator";

import {
    createUser, getUsers
} from '../controllers'

const router = express.Router();

router.post('/', [
    check('rol', 'El rol es requerido')
        .notEmpty()
        .isIn(['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'])
        .withMessage('No es un rol válido'),
    check('name', 'El nombre es requerido')
        .isLength({min: 2})
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    check('firstLastName', 'El apellido es requerido')
        .isLength({min: 2})
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    check('birthday', 'La fecha de nacimiento es requerida')
        .isDate()
        .notEmpty(),
    check('genre', 'El género es requerido')
        .isIn(['M', 'F', 'NB'])
        .withMessage('Debe ser un género válido (M-F-NB)')
        .notEmpty(),
    check('email', 'El email es requerido')
        .isEmail()
        .withMessage('El formato tiene que ser correcto')
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
    check('numInt', 'El número interior es requerido')
        .notEmpty(),
    validateFields
], createUser)

router.get('/', [

], getUsers)


export default router;










