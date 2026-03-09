import type { Coordinates } from './coordinates.model';

const GEOCODING_API = import.meta.env.VITE_GEOCODING_API;
const WEATHER_API = import.meta.env.VITE_WEATHER_API;

export class WeatherService {
  public async getWeatherData(city: string, date: string) {
    try {
      const coordinates = await this.getCoordinates(city);
      const weatherData = await this.fetchWeatherData(coordinates, date);

      return weatherData;
    } catch (error) {
      throw error;
    }
  }

  private async getCoordinates(city: string): Promise<Coordinates> {
    try {
      const response = await fetch(
        `${GEOCODING_API}/search?q=${city.toLowerCase()}&format=json`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch coordinates');
      }

      const data = await response.json();

      if (!data.length) {
        throw new Error('City not found');
      }

      const { lat, lon } = data[0];

      return {
        latitude: Number.parseFloat(lat),
        longitude: Number.parseFloat(lon),
      };
    } catch (error) {
      throw error;
    }
  }

  private async fetchWeatherData(coordinates: Coordinates, date: string) {
    try {
      const response = await fetch(
        `${WEATHER_API}/?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&daily=apparent_temperature_max,apparent_temperature_min,weathercode&timezone=Europe/Budapest`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch wetaher data');
      }

      const data = await response.json();

      const dateIndex = data.daily.time.findIndex((i: string) => i === date);

      return {
        minTemp: data.daily.apparent_temperature_max[dateIndex],
        maxTemp: data.daily.apparent_temperature_min[dateIndex],
        weathercode: data.daily.weathercode[dateIndex],
      };
    } catch (error) {
      throw error;
    }
  }
}
