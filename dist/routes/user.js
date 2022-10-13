"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
router.post('/', [
    (0, express_validator_1.check)('rol', 'El rol es requerido')
        .notEmpty()
        .isIn(['SUPER_ADMIN', 'CLIENT', 'ASSOCIATED', 'FINAL_USER'])
        .withMessage('No es un rol válido'),
    (0, express_validator_1.check)('name', 'El nombre es requerido')
        .isLength({ min: 2 })
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    (0, express_validator_1.check)('firstLastName', 'El apellido es requerido')
        .isLength({ min: 2 })
        .notEmpty()
        .withMessage('Al menos 2 letras'),
    (0, express_validator_1.check)('birthday', 'La fecha de nacimiento es requerida')
        .isDate()
        .notEmpty(),
    (0, express_validator_1.check)('genre', 'El género es requerido')
        .isIn(['M', 'F', 'NB'])
        .withMessage('Debe ser un género válido (M-F-NB)')
        .notEmpty(),
    (0, express_validator_1.check)('email', 'El email es requerido')
        .isEmail()
        .withMessage('El formato tiene que ser correcto')
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
    (0, express_validator_1.check)('numInt', 'El número interior es requerido')
        .notEmpty(),
    middlewares_1.validateFields
], controllers_1.createUser);
router.get('/', [], controllers_1.getUsers);
exports.default = router;
