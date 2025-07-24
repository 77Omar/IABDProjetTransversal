import axios from "axios";

const API_KEY = "0b8de18ff902a523736021ee54aba2a1";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeeklyForecast = async (lat: number, lon: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        lat: lat,
        lon: lon,
        appid: API_KEY,
        units: "metric",
        lang: "fr",
        cnt: 40, 
      },
    });

    // Transformez les données en format quotidien
    const dailyData = [];
    for (let i = 0; i < response.data.list.length; i += 8) {
      const day = response.data.list[i];
      dailyData.push({
        dt: day.dt,
        temp: {
          max: day.main.temp_max,
          min: day.main.temp_min,
        },
        weather: day.weather,
      });
    }

    return dailyData.slice(0, 7); // Retourne 7 jours max
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Erreur API Forecast:",
        error.response?.data || error.message
      );
    } else {
      console.error("Erreur API Forecast:", (error as Error).message);
    }
    throw new Error("Impossible de charger les prévisions");
  }
};
