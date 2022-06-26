const router = require('express').Router();
import { createPlan, createPromotion, getPromotions } from "./handler";

/***
 * APIs :
 *  1. Create plans
 *  2. Create promotions
 * ***/

router.post('/create/plan', createPlan);
router.post('/create/promotion', createPromotion);

router.get('/promotion', getPromotions);

export default router;