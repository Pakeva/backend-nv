"use strict";
exports.__esModule = true;
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var bondingAssociated_1 = require("../controllers/bondingAssociated");
var helpers_1 = require("../helpers");
var router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('associatedID', 'El Id del asociado es requerido')
        .isMongoId()
        .custom(helpers_1.userExists),
    middlewares_1.validateFields
], bondingAssociated_1.addAssociatedToCompany);
router.get('/', [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], bondingAssociated_1.getBondingAssociatedToCompany);
router["delete"]('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'El id es requerido')
        .isMongoId(),
    middlewares_1.validateFields
], bondingAssociated_1.deleteBounding);
exports["default"] = router;
