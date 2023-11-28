import { Router, Request, Response } from "express";
import https from 'https';

import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env'});

const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const router = Router();

router.get('/test', async (req, res) => {
    try {
        https.get(`${BASE_API_URL}q=London&appid=${process.env.OPEN_WEATHER_API_KEY}`,
            (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    const jsonData = JSON.parse(data);
                    return res.status(200).json({ weatherData: jsonData });
                });
            }).on("error", (err) => {
                console.log("Error: " + err.message);
            }
        );
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

module.exports = router;