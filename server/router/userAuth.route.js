import express from 'express';
import { signup } from '../controller/userAuth.controller.js';



const router = express.Router();

router.post('/signup', signup);
// router.post('/sigin', signin);


export default router;