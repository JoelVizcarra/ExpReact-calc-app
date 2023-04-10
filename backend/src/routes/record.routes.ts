import express from 'express';
import {
  createRecordHandler,
  deleteRecordHandler,
  getRecordHandler,
  getRecordsHandler,
} from '../controllers/record.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import {
  createRecordSchema,
  deleteRecordSchema,
  getRecordSchema,
} from '../schemas/record.schema';

const router = express.Router();

router.use(deserializeUser, requireUser);
router
  .route('/')
  .post(validate(createRecordSchema), createRecordHandler)
  .get(getRecordsHandler);

router
  .route('/:recordId')
  .get(validate(getRecordSchema), getRecordHandler)
  .delete(validate(deleteRecordSchema), deleteRecordHandler);

export default router;
