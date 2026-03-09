export class DarkModeToggle {
  private readonly lightColors = {
    '--primary-color': 'rgb(243, 198, 49)',
    '--secondary-color': 'rgb(1, 110, 1)',
    '--body-background': '#f4f4f4',
    '--header-bg-color': 'var(--primary-color)',
    '--gutter': '10px',
    '--btn-bdrs': '3px',
    '--input-bdrs': '5px',
    '--weather-card-bg': 'var(--secondary-color)',
    '--weather-card-brds': '10px',
    '--error-color': '#721c24',
    '--error-bg-color': '#f8d7da',
    '--error-border-color': '#f5c6cb',
  };

  private readonly darkColors = {
    '--primary-color': '#13413b',
    '--secondary-color': '#996e2a',
    '--body-background': '#131e27',
    '--header-bg-color': 'var(--primary-color)',
    '--gutter': '10px',
    '--btn-bdrs': '3px',
    '--input-bdrs': '5px',
    '--weather-card-bg': '#1e1e1e',
    '--weather-card-brds': '10px',
    '--error-color': '#ff6b6b',
    '--error-bg-color': '#3b1f22',
    '--error-border-color': '#5c2a2e',
  };

  private readonly localStorageKey = 'color-sheme';

  private readonly rootEl = document.querySelector<HTMLStyleElement>(':root');
  private readonly darkModeSwitchEl = document.getElementById(
    'dark-mode-switch',
  ) as HTMLElement;

  constructor() {
    this.setScheme(this.getCurrentScheme());
  }

  public toggleDarkMode() {
    const currentScheme = this.getCurrentScheme();

    const newScheme = currentScheme === 'light' ? 'dark' : 'light';
    this.setScheme(newScheme);
    this.darkModeSwitchEl.innerText =
      newScheme === 'dark' ? 'dark_mode' : 'light_mode';
  }

  private setScheme(scheme: 'light' | 'dark') {
    Object.entries(
      scheme === 'dark' ? this.darkColors : this.lightColors,
    ).forEach(([key, value]) => {
      return this.rootEl!.style.setProperty(key, value);
    });

    if (scheme === 'dark') {
      this.darkModeSwitchEl.innerText = 'dark_mode';
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
      this.darkModeSwitchEl.innerText = 'light_mode';
    }

    localStorage.setItem(this.localStorageKey, scheme);
  }

  private getCurrentScheme() {
    const currentScheme = localStorage.getItem(this.localStorageKey);

    return currentScheme && currentScheme === 'dark' ? 'dark' : 'light';
  }
}
