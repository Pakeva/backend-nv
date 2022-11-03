import {Router} from "express";
import {validateFields, validateJwt} from "../middlewares";
import {createShipping, getShippings} from "../controllers";

const router = Router();


router.post('/', [
    validateJwt,
    //TODO all validations
    validateFields
], createShipping)

router.get('/', [
    validateJwt,
    //TODO all validations
    validateFields
], getShippings)



export default router;