import { Router } from "express";
import https from 'https';
import { convertKelvinTempToCelsius, convertKelvinTempToFahrenheit } from "../../helpers/converters";

import dotenv from 'dotenv';
import { json } from "body-parser";
dotenv.config({ path: '../../../../.env'});

const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather?";
const router = Router();

router.get('/weather/:cityName', async (req, res) => {
    const { cityName } = req.params;

    try {
        https.get(`${BASE_API_URL}q=${cityName}&appid=${process.env.OPEN_WEATHER_API_KEY}`,
            (resp) => {
                let data = '';
                resp.on('data', (chunk) => {
                    data += chunk;
                });
                resp.on('end', () => {
                    const jsonData = JSON.parse(data);

                    if (jsonData.cod === "404") 
                        return res.status(404).json(jsonData);
                    else
                        return res.status(200).json({
                            cod: jsonData.cod,
                            city: jsonData.name,
                            country: jsonData.sys.country,
                            tempCelsius: convertKelvinTempToCelsius(jsonData.main.temp),
                            tempFahrenheit: convertKelvinTempToFahrenheit(jsonData.main.temp),
                            feelsLikeCelsius: convertKelvinTempToCelsius(jsonData.main.feels_like),
                            feelsLikeFahrenheit: convertKelvinTempToFahrenheit(jsonData.main.feels_like),
                            weatherConditions: jsonData.weather,
                            windSpeed: jsonData.wind.speed
                        });
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