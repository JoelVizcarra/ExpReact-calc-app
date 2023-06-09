import express from 'express';
import {
  loginUserHandler,
  logoutHandler,
  refreshaccess_tokenHandler,
  registerUserHandler,
} from '../controllers/auth.controller';
import { deserializeUser } from '../middleware/deserializeUser';
import { requireUser } from '../middleware/requireUser';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';

const router = express.Router();

router.post('/register', validate(createUserSchema), registerUserHandler);

router.post('/login', validate(loginUserSchema), loginUserHandler);

router.get('/logout', deserializeUser, requireUser, logoutHandler);

router.get('/refresh', refreshaccess_tokenHandler);

export default router;
