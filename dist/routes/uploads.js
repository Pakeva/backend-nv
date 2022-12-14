"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const express_validator_1 = require("express-validator");
const middlewares_1 = require("../middlewares");
const router = (0, express_1.Router)();
router.post('/', controllers_1.cargaArchivo);
router.put('/:collection/:id', [
    middlewares_1.validateJwt,
    (0, express_validator_1.check)('id', 'Debe ser un mongo id valido').isMongoId(),
    middlewares_1.validateFields
], controllers_1.updateImage);
router.get('/:collection/:id', controllers_1.getImage);
exports.default = router;
