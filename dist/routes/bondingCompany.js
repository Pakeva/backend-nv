"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// router.post('/', [
//   validateJwt,
//   check('companyId', 'El Id de la compania es requerido')
//     .isMongoId()
//     .custom(userExists),
//   validateFields
// ], addUserToCompany)
// router.get('/', [
//   validateJwt,
//   validateFields
// ], getBondingCompaniesToUser)
//
// router.delete('/:id', [
//   validateJwt,
//   check('id', 'El id es requerido')
//     .isMongoId(),
//   validateFields
// ], deleteBoundingCompany)
exports.default = router;
