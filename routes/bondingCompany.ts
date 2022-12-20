// import {Router} from "express";
// import {validateFields, validateJwt} from "../middlewares";
// import { addUserToCompany, deleteBoundingCompany, getBondingCompaniesToUser } from "../controllers/bondingCompany";
// import { check } from "express-validator";
// import { userExists } from "../helpers";
//
// const router = Router();
//
//
// router.post('/', [
//   validateJwt,
//   check('companyId', 'El Id de la compania es requerido')
//     .isMongoId()
//     .custom(userExists),
//   validateFields
// ], addUserToCompany )
//
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
//
//
//
// export default router;
