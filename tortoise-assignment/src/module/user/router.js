const router = require('express').Router();
import { addNewCustomer, getPlans, enrollUser } from "./handler";

router.post('/add', addNewCustomer);

router.get('/', getPlans);
router.post('/enroll', enrollUser);

export default router;