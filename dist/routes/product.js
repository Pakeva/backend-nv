"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get('', [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], controllers_1.getProducts);
router.post('/', [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('SUPER_ADMIN', 'ASSOCIATED', 'CLIENT'),
    (0, express_validator_1.check)('name', 'El nombre es requerido')
        .notEmpty()
        .isLength({ min: 3 }),
    (0, express_validator_1.check)('price', 'El precio es requerido')
        .isNumeric()
        .notEmpty(),
    (0, express_validator_1.check)('available', 'La disponibilidad es requerida')
        .notEmpty(),
    (0, express_validator_1.check)('category', 'Debe ser un ID válido')
        .isMongoId(),
    middlewares_1.validateFields,
], controllers_1.createProduct);
exports.default = router;
