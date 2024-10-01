import express, { Request, Response, Router } from 'express';

import authMiddleware from '../middleware/authMiddleware'
import { AuthController } from '../controllers/auth.controller';
import { LogController } from '../controllers/log.controller';

const router: Router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.post('/send-logs', authMiddleware, LogController.sendLogs);
router.post('/report', authMiddleware, LogController.getReport);



export default router;
