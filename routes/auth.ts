import {Router} from "express";
import {loginUser} from '../controllers'
import {searchUserByEmail} from "../helpers";
import {check} from "express-validator";
import {validateFields} from "../middlewares";

const router = Router();


router.post('/login', [
    check('email', 'El email es necesario')
        .custom(searchUserByEmail),
    validateFields
], loginUser)


export default router;