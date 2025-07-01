import { Router } from 'express';
const router = Router();
import {getSearchList} from '../controllers/searchController.js'

router.get('/', getSearchList);

export default router;