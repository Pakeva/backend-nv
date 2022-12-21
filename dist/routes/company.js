"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewares_1 = require("../middlewares");
const express_validator_1 = require("express-validator");
const companies_1 = require("../controllers/companies");
const router = (0, express_1.Router)();
router.post("/", [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('CLIENT'),
    (0, express_validator_1.check)('name', 'El nombre es requerido').notEmpty(),
    (0, express_validator_1.check)('description', 'La descripcion es requerida').notEmpty(),
    middlewares_1.validateFields
], companies_1.setInitialCompanyInfo);
router.put("/:id", [
    middlewares_1.validateJwt,
    (0, middlewares_1.hasRol)('CLIENT'),
    (0, express_validator_1.check)('id', 'Debe ser un id valido')
        .isMongoId(),
    (0, express_validator_1.check)('name', 'El nombre es requerido').notEmpty(),
    (0, express_validator_1.check)('description', 'La descripcion es requerida').notEmpty(),
    middlewares_1.validateFields
], companies_1.updateCompanyInfo);
router.get("/", [
    middlewares_1.validateJwt,
    middlewares_1.validateFields
], companies_1.getCompanyInfo);
exports.default = router;
