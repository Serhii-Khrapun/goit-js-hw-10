import './css/styles.css';
import countryCard from './country-card.hbs';
import flagNamesCard from './flag-names.hbs';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries';
const countryContainer = document.querySelector('.country-info');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
  const searchCountry = searchInput.value.trim();
  if (searchCountry === '') {
    return (countryContainer.innerHTML = '');
  }
  API.fetchCountryByName(searchCountry).then(renderCountryCard).catch(showError);
}

function showError(params) {
  Notify.failure('Oops, there is no country with that name');
}

function renderCountryCard(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (country.length >= 2 || country.length > 10) {
    const markup = flagNamesCard(country);
    countryContainer.innerHTML = markup;
    return;
  } else {
    const markup = countryCard(country);
    countryContainer.innerHTML = markup;
  }
}
