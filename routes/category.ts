import {Router} from 'express';
import {
    getCategory,
    getCategories,
    createCategory
} from '../controllers'


const router = Router();

router.get('/', [

], getCategories)









export default router;