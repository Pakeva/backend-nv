import {Router} from "express";
import {check} from "express-validator";
import {validateFields, validateJwt} from "../middlewares";
import {addAssociatedToCompany, deleteBounding, getBondingAssociatedToCompany} from "../controllers/bondingAssociated";
import {userExists} from "../helpers";

const router = Router();


router.post('/', [
    validateJwt,
    check('associatedID', 'El Id del asociado es requerido')
        .isMongoId()
        .custom(userExists),
    validateFields
], addAssociatedToCompany)

router.get('/', [
    validateJwt,
    validateFields
], getBondingAssociatedToCompany)

router.delete('/:id', [
    validateJwt,
    check('id', 'El id es requerido')
        .isMongoId(),
    validateFields
], deleteBounding)


export default router;