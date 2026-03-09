import './scss/app.scss';
import { SearchFrom } from './search/search';
import { WeatherService } from './weather/weather';

document.addEventListener('DOMContentLoaded', () => {
  const weatherService = new WeatherService();
  const searchFrom = new SearchFrom(weatherService);
});
