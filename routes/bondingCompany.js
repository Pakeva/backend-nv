"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var bondingCompany_1 = require("../controllers/bondingCompany");
var router = (0, express_1.Router)();
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
exports["default"] = router;
