import { WeatherCard } from '../weather/card';
import type { WeatherService } from '../weather/weather';

export class SearchFrom {
  form: HTMLFormElement;
  cityInput: HTMLInputElement;
  dateInput: HTMLInputElement;
  submitBtn: HTMLButtonElement;
  cardContainer: HTMLElement;
  errorMessage: HTMLElement;

  constructor(private readonly weatherService: WeatherService) {
    this.form = document.getElementById('weather-form') as HTMLFormElement;
    this.cityInput = document.getElementById('city-input') as HTMLInputElement;
    this.dateInput = document.getElementById('date-input') as HTMLInputElement;
    this.cardContainer = document.getElementById(
      'weather-container',
    ) as HTMLElement;
    this.errorMessage = document.getElementById('error-message') as HTMLElement;
    this.submitBtn = document.getElementById(
      'weather-submit',
    ) as HTMLButtonElement;

    this.setDateRange();
    this.submitHandler();
  }

  private submitHandler() {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault();

      this.cardContainer.insertAdjacentHTML(
        'afterbegin',
        `<div id="loader-container" class="loader-container"><span class="loader"></span></div>`,
      );

      this.errorMessage.style.display = 'none';
      this.submitBtn.disabled = true;

      try {
        const weatherData = await this.weatherService.getWeatherData(
          this.cityInput.value,
          this.dateInput.value,
        );

        new WeatherCard(
          this.cityInput.value,
          this.dateInput.value,
          weatherData,
        );

        this.form.reset();
      } catch (error) {
        console.log(error);
        this.errorMessage.style.display = 'block';
        setTimeout(() => {
          this.errorMessage.style.display = 'none';
        }, 2000);

        throw error;
      } finally {
        this.cardContainer.removeChild(
          document.getElementById('loader-container')!,
        );
        this.submitBtn.disabled = false;
      }
    });
  }

  private setDateRange() {
    const now = new Date();

    const nowYear = now.getFullYear();
    const nowMonth = now.getMonth() + 1;
    const nowDay = now.getDate();

    const todayDate = `${nowYear}-${this.padNumber(nowMonth)}-${this.padNumber(nowDay)}`;
    this.dateInput.setAttribute('min', todayDate);

    const max = new Date();
    max.setDate(max.getDate() + 6);
    const maxYear = max.getFullYear();
    const maxMonth = max.getMonth() + 1;
    const maxDay = max.getDate();

    const maxDate = `${maxYear}-${this.padNumber(maxMonth)}-${this.padNumber(maxDay)}`;

    this.dateInput.setAttribute('max', maxDate);
  }

  private padNumber(value: number): string {
    return value < 10 ? value.toString().padStart(2, '0') : value.toString();
  }
}
