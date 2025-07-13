import axios from "axios";

const API_KEY = "0b8de18ff902a523736021ee54aba2a1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getAirQuality = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    return {
      main: response.data.list[0].main,
      components: response.data.list[0].components,
    };
  } catch (error) {
    console.error("Error fetching air quality:", error);
    return null;
  }
};
