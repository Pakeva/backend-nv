// import { Router } from "express";
// import { addNewShipping, getShipping } from "../controllers";
// import { hasRol, validateFields, validateJwt } from "../middlewares";
// import { check } from "express-validator";
// import { emailExists, isUserActive, userExists } from "../helpers";
//
// const router = Router();
//
// router.get("/", [
//   validateJwt,
//
//   validateFields
// ], getShipping);
//
// router.post("/", [
//   validateJwt,
//   hasRol('CLIENT'),
//   check('company', 'Debe ser un id valido').isMongoId()
//     .custom(userExists)
//     .custom(isUserActive),
//   validateFields
// ], addNewShipping);
//
// export default router;
