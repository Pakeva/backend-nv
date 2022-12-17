"use strict";
exports.__esModule = true;
var express_1 = require("express");
var controllers_1 = require("../controllers");
var router = (0, express_1.Router)();
router.get('/', [], controllers_1.getShipping);
exports["default"] = router;
