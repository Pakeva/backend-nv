"use strict";
exports.__esModule = true;
var express_1 = require("express");
var middlewares_1 = require("../middlewares");
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
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
exports["default"] = router;
