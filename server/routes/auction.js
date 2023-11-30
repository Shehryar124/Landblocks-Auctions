import express from 'express';
import {createAuction, fetchAuction, updateAuction} from '../controllers/auction.js'

const router = express.Router();

router.post('/createAuction', createAuction);
router.get('/getAuctions', fetchAuction);
router.post('/updateAuction', updateAuction);

export default router;
