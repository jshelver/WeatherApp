export const convertKelvinTempToCelsius = (temp) => {
    return Math.round(temp - 273.15);
};

export const convertKelvinTempToFahrenheit = (temp) => {
    return Math.round((temp - 273.15) * 1.8 + 32);
};