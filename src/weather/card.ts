import type { WeatherData } from './weather-data.model';

export class WeatherCard {
  constructor(city: string, date: string, weatherData: WeatherData) {
    const minTemp = weatherData.minTemp;
    const maxTemp = weatherData.maxTemp;
    const cardsContainer = document.getElementById('weather-container')!;

    cardsContainer.insertAdjacentHTML(
      'afterbegin',
      `<div class="weather-card">
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
