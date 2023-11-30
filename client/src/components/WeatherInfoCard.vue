<script setup>
import { ref } from 'vue';

const props = defineProps({
    weather: {
        type: Object,
        required: true
    }
});

const iconURL = (icon) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
</script>

<template>
    <div class="card-wrapper">
        <h1 class="city-name">{{ weather.city }}</h1>
        <h2 class="temperature">{{ weather.tempFahrenheit }}°F / {{ weather.tempCelsius }}°C</h2>
        <div class="weather-conditions-wrapper">
            <h1 class="weather-condition" v-for="condition in weather.weatherConditions">{{ condition.main }} - 
                <img :src="iconURL(condition.icon)" alt="" class="weather-icon"> 
            </h1>
        </div>
    </div>
</template>

<style scoped>
.card-wrapper {
    margin-top: 40px;
    width: 400px;
    height: 500px;
    background-color: rgb(83, 132, 216);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.weather-conditions-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.weather-condition {
    display: flex;
    align-items: center;
}

.weather-icon {
    width: 50px;
}
</style>