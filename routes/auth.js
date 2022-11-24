"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var helpers_1 = require("../helpers");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'El email es necesario')
        .custom(helpers_1.searchUserByEmail),
    middlewares_1.validateFields
], controllers_1.loginUser);
exports["default"] = router;
