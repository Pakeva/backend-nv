"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const bondingCompany_1 = require("../controllers/bondingCompany");
const express_validator_1 = require("express-validator");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
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
router.delete('/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'El id es requerido')
        .isMongoId(),
    middlewares_1.validateFields
], bondingCompany_1.deleteBoundingCompany);
exports.default = router;
