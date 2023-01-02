"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
// router.get("/:id", [
//   validateJwt,
//   check('id', 'Debe ser un id valido')
//     .isMongoId(),
//   validateFields
// ], getShipping);
//
// router.put("/:id", [
//   validateJwt,
//   check('id', 'Debe ser un id valido')
//     .isMongoId(),
//   check('status', 'El estatus del pedido es requerido').notEmpty(),
//   validateFields
// ], updateShippingStatus);
//
// router.get("/", [
//   validateJwt,
//   validateFields
// ], getAllShippings);
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
exports.default = router;
