import express from 'express';
import { openAppController } from '../controller/openAppController.js';

const router = express.Router();

router.get('/open-app', openAppController);

export { router as openAppRouter };
