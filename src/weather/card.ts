import type { WeatherData } from './weather-data.model';

export class WeatherCard {
  constructor(city: string, date: string, weatherData: WeatherData) {
    const minTemp = weatherData.minTemp;
    const maxTemp = weatherData.maxTemp;
    const weathercode = weatherData.weathercode;
    const cardsContainer = document.getElementById('weather-container')!;

    cardsContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="weather-card ${this.chooseWeatherBg(weathercode)}">
            <div class="weather-card-inner">
              <h4>${city} - ${date}</h4>
              <p>${minTemp} °C</p>
              <p>${maxTemp} °C</p>
              <button class="weather-card-delete btn" type="button">Delete</button>
            </div>
          </div>`,
    );

    this.deleteCard();
  }

  private chooseWeatherBg(code: number) {
    if ([0].includes(code)) return 'clear';
    if ([1, 2, 3].includes(code)) return 'cloudy';
    if ([45, 48].includes(code)) return 'fog';
    if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle';
    if ([61, 63, 65, 80, 81, 82].includes(code)) return 'rain';
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow';
    if ([95, 96, 99].includes(code)) return 'storm';

    return '';
  }

  private deleteCard() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;

      if (target.classList.contains('weather-card-delete')) {
        const card = target.closest('.weather-card');
        if (card) {
          card.remove();
        }
      }
    });
  }
}
