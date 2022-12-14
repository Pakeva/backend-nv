"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var express_validator_1 = require("express-validator");
var middlewares_1 = require("../middlewares");
var router = (0, express_1.Router)();
router.put('/:collection/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'Debe ser un mongo id valido').isMongoId(),
    middlewares_1.validateFields
], controllers_1.updateImage);
router.get('/:collection/:id', controllers_1.getImage);
exports["default"] = router;
