"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var bondingCompany_1 = require("../controllers/bondingCompany");
var express_validator_1 = require("express-validator");
var helpers_1 = require("../helpers");
var router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('companyId', 'El Id de la compania es requerido')
        .isMongoId()
        .custom(helpers_1.userExists),
    middlewares_1.validateFields
], bondingCompany_1.addUserToCompany);
router.get('/', [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], bondingCompany_1.getBondingCompaniesToUser);
router["delete"]('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'El id es requerido')
        .isMongoId(),
    middlewares_1.validateFields
], bondingCompany_1.deleteBoundingCompany);
exports["default"] = router;
