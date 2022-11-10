import {Router} from "express";
import {validateFields, validateJwt} from "../middlewares";
import { addUserToCompany, getBondingCompaniesToUser } from "../controllers/bondingCompany";

const router = Router();


router.post('/', [
  validateJwt,
  //TODO all validations
  validateFields
], addUserToCompany )

router.get('/', [
  validateJwt,
  //TODO all validations
  validateFields
], getBondingCompaniesToUser)



export default router;
