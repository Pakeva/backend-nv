"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var express_validator_1 = require("express-validator");
var controllers_1 = require("../controllers");
var helpers_1 = require("../helpers");
var router = express_1["default"].Router();
router.post('/', [
    (0, express_validator_1.check)('rol', 'El rol es requerido')
        .notEmpty()
        // .isIn(['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'])
        .withMessage('No es un rol válido')
        .custom(helpers_1.isValidRol),
    (0, express_validator_1.check)('name', 'El nombre es requerido')
        .isLength({ min: 2 })
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    (0, express_validator_1.check)('firstLastName', 'El apellido es requerido')
        .isLength({ min: 2 })
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    (0, express_validator_1.check)('birthday', 'La fecha de nacimiento es requerida')
        .isDate(),
    (0, express_validator_1.check)('genre', 'El género es requerido')
        .isIn(['M', 'F', 'NB'])
        .withMessage('Debe ser un género válido (M-F-NB)')
        .notEmpty(),
    (0, express_validator_1.check)('email', 'El email es requerido')
        .isEmail()
        .withMessage('El formato tiene que ser correcto')
        .custom(helpers_1.emailExists)
        .notEmpty(),
    (0, express_validator_1.check)('phone')
        .isNumeric()
        .isLength({ min: 5 })
        .withMessage('Solo se aceptan números')
        .notEmpty(),
    (0, express_validator_1.check)('password', 'La constraseña es requerida')
        .isLength({ min: 6 })
        .withMessage('Al menos 6 carácteres')
        .notEmpty(),
    (0, express_validator_1.check)('zip', 'El código postal es requerido')
        .isNumeric()
        .isLength({ min: 5, max: 5 })
        .withMessage('Solo se aceptan números')
        .notEmpty(),
    (0, express_validator_1.check)('state', 'El estado es requerido')
        .notEmpty(),
    (0, express_validator_1.check)('municipality', 'El municipio es requerido')
        .notEmpty(),
    (0, express_validator_1.check)('colony', 'La colonia es requerida')
        .notEmpty(),
    (0, express_validator_1.check)('street', 'La calle es requerida')
        .notEmpty(),
    middlewares_1.validateFields
], controllers_1.createUser);
router.get('/', [
    middlewares_1.validateJwt,
    middlewares_1.isAdminRol,
    middlewares_1.validateFields
], controllers_1.getUsers);
router.get('/:id', [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('CLIENT', 'SUPER_ADMIN', 'ASSOCIATED'),
    (0, express_validator_1.check)('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(helpers_1.userExists),
    middlewares_1.validateFields
], controllers_1.getUser);
router["delete"]('/:id', [
    middlewares_1.validateJwt,
    //isAdminRole
    (0, express_validator_1.check)('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(helpers_1.userExists)
        .custom(helpers_1.isUserActive),
    middlewares_1.validateFields
], controllers_1.deleteUser);
router.put('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'Tiene que ser un ID válido')
        .isMongoId()
        .custom(helpers_1.userExists),
    middlewares_1.validateFields
], controllers_1.updateUser);
router.get('/bonding/:bc', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('bc', 'No es un codigo valido')
        .custom(helpers_1.bondingCodeExists),
    middlewares_1.validateFields
], controllers_1.getUserByBondingCode);
exports["default"] = router;
