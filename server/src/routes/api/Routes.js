import { Router } from "express";

import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env'});


const router = Router();

router.get('/test', async (req, res) => {
    return res.status(200).json({ message: 'Test route works!' });
});

module.exports = router;