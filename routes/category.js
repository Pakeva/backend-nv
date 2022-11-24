"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var middlewares_1 = require("../middlewares");
var express_validator_1 = require("express-validator");
var helpers_1 = require("../helpers");
var router = (0, express_1.Router)();
router.get('/', [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    middlewares_1.validateFields
], controllers_1.getCategories);
router.get('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'No es un id válido')
        .isMongoId()
        .custom(helpers_1.categoryExists),
    (0, middlewares_1.hasRol)('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    middlewares_1.validateFields
], controllers_1.getCategory);
router.post('/', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('name', 'El nombre de la categoría es requerido')
        .notEmpty()
        .isLength({ min: 3, max: 50 }),
    middlewares_1.validateFields
], controllers_1.createCategory);
router.put('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'No es un id válido')
        .isMongoId()
        .custom(helpers_1.categoryExists),
    (0, express_validator_1.check)('name', 'El nombre es requerido')
        .notEmpty()
        .isLength({ min: 3 }),
    (0, middlewares_1.hasRol)('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    middlewares_1.validateFields
], controllers_1.updateCategory);
router["delete"]('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'No es un id válido')
        .isMongoId()
        .custom(helpers_1.categoryExists),
    (0, middlewares_1.hasRol)('SUPER_ADMIN', 'FINAL_USER', 'CLIENT'),
    middlewares_1.validateFields
], controllers_1.deleteCategory);
exports["default"] = router;
