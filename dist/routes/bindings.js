"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const bindings_1 = require("../controllers/bindings");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJwt,
    //TODO all validations
    middlewares_1.validateFields
], bindings_1.bindCompanyToUser);
// router.get('/', [
//   validateJwt,
//   //TODO all validations
//   validateFields
// ], )
exports.default = router;
