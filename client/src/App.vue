<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import WeatherInfoCard from './components/WeatherInfoCard.vue';

const cityName = ref('');
const weather = ref(null);

onMounted(async () => {
	const response = await axios.get(`/api/weather/${cityName.value}`);
	weather.value = response.data;
});

watch(cityName, async (newVal) => {
	const response = await axios.get(`/api/weather/${newVal}`);
	weather.value = response.data;
});
</script>

<template>
  	<div class="container">
		<h1 class="app-title">Weather App</h1>
		<input v-model="cityName" class="search-input" placeholder="Enter city name here..."/>
		<WeatherInfoCard :weather="weather"/>
  	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.app-title {
	margin-top: 20px;
	font-size: 2.1rem;
}

.search-input {
	margin-top: 20px;
	width: 300px;
	height: 40px;
	font-size: 20px;
	padding: 0 10px;
	border: 1px solid black;
	border-radius: 5px;
}
</style>
