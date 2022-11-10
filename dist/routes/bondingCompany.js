"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const bondingCompany_1 = require("../controllers/bondingCompany");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJwt,
    //TODO all validations
    middlewares_1.validateFields
], bondingCompany_1.addUserToCompany);
router.get('/', [
    middlewares_1.validateJwt,
    //TODO all validations
    middlewares_1.validateFields
], bondingCompany_1.getBondingCompaniesToUser);
exports.default = router;
