import { Router } from 'express';
import { login, probandoLogin  } from '../controllers/login.controller';

const router = Router();

router.get('', probandoLogin);
router.post('', login);

export default router;
