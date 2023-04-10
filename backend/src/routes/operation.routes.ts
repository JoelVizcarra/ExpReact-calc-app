import express from 'express';
import { getOperationsHandler } from '../controllers/operation.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.use(deserializeUser, requireUser);
router.route('/').get(getOperationsHandler);

export default router;
