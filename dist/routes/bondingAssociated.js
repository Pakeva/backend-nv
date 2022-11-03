"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const bondingAssociated_1 = require("../controllers/bondingAssociated");
const helpers_1 = require("../helpers");
const router = (0, express_1.Router)();
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
exports.default = router;
