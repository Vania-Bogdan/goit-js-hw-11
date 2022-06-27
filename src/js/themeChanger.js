import { refs } from './refs';

const STORAGE_KEY = 'userTheme';
const SETTINGS = {
  light: '#fff',
  dark: '#333',
};

let userTheme = localStorage.getItem(STORAGE_KEY);

function changeTheme(e, userTheme) {
  const el = refs.themeChanger;

  const theme = userTheme ? userTheme : el.dataset.theme;
  if (userTheme) {
      if (userTheme === 'light') setLight(el);
      else setDark(el);

      return
  }

  if (theme === 'light') setDark(el);
  else setLight(el);

  localStorage.setItem(STORAGE_KEY, el.dataset.theme);
}

function setDark(el) {
  el.textContent = 'dark theme';
  el.style.backgroundColor = SETTINGS.dark;
  el.style.color = SETTINGS.light;
  el.dataset.theme = 'dark';
  document.body.style.backgroundColor = SETTINGS.dark;
}

function setLight(el) {
  el.textContent = 'light theme';
  el.style.backgroundColor = SETTINGS.light;
  el.style.color = SETTINGS.dark;
  el.dataset.theme = 'light';
  document.body.style.backgroundColor = SETTINGS.light;
}

refs.themeChanger.dataset.theme = userTheme;
document.body.style.backgroundColor = SETTINGS[userTheme];

changeTheme(undefined, userTheme);

refs.themeChanger.addEventListener('click', changeTheme);