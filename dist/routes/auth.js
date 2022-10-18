"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const helpers_1 = require("../helpers");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/login', [
    //todo validations
    (0, express_validator_1.check)('email', 'El email es necesario')
        .custom(helpers_1.searchUserByEmail),
    middlewares_1.validateFields
], controllers_1.loginUser);
exports.default = router;
