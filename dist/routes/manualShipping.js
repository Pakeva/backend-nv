"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.get("/", [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], controllers_1.getShipping);
router.post("/", [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('CLIENT'),
    middlewares_1.validateFields
], controllers_1.addNewShipping);
exports.default = router;
