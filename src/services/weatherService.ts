import axios from 'axios';

const API_KEY = "0b8de18ff902a523736021ee54aba2a1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=fr`
    );
    return {
      temp: response.data.main.temp,
      feels_like: response.data.main.feels_like,
      humidity: response.data.main.humidity,
      alerts: response.data.weather[0].description
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};