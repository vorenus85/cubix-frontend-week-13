import './scss/app.scss';
import { DarkModeToggle } from './dark-toggle/dark-mode-toggle';
import { SearchFrom } from './search/search';
import { WeatherService } from './weather/weather';

document.addEventListener('DOMContentLoaded', () => {
  const weatherService = new WeatherService();
  const searchFrom = new SearchFrom(weatherService);

  const darkModeService = new DarkModeToggle();
  document.getElementById('dark-mode-switch')?.addEventListener('click', () => {
    darkModeService.toggleDarkMode();
  });
});
