import express from 'express';
import {createAuction, fetchAuction} from '../controllers/auction.js'

const router = express.Router();

router.post('/createAuction', createAuction);
router.get('/getAuctions', fetchAuction);

export default router;
