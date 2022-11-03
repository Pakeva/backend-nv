"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/', [
    middlewares_1.validateJwt,
    //TODO all validations
    middlewares_1.validateFields
], controllers_1.createShipping);
router.get('/', [
    middlewares_1.validateJwt,
    //TODO all validations
    middlewares_1.validateFields
], controllers_1.getShippings);
exports.default = router;
