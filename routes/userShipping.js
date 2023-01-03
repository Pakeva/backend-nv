"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var express_validator_1 = require("express-validator");
var helpers_1 = require("../helpers");
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router.get("/:id", [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'Debe ser un id valido')
        .isMongoId(),
    middlewares_1.validateFields
], controllers_1.getUserShipping);
router.put("/:id", [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'Debe ser un id valido')
        .isMongoId(),
    (0, express_validator_1.check)('status', 'El estatus del pedido es requerido').notEmpty(),
    middlewares_1.validateFields
], controllers_1.updateUserShippingStatus);
router.get("/", [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], controllers_1.getUserShippings);
router.post("/", [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('FINAL_USER'),
    (0, express_validator_1.check)('company', 'Debe ser un id valido').isMongoId()
        .custom(helpers_1.userExists)
        .custom(helpers_1.isUserActive),
    (0, express_validator_1.check)('user', 'Debe ser un id valido').isMongoId()
        .custom(helpers_1.userExists)
        .custom(helpers_1.isUserActive),
    (0, express_validator_1.check)('description', 'La descripcion es requerida')
        .notEmpty(),
    (0, express_validator_1.check)('products', 'Debes agregar al menos un producto')
        .notEmpty(),
    middlewares_1.validateFields
], controllers_1.addNewUserShipping);
exports["default"] = router;
