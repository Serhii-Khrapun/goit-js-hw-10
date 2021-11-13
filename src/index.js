import './css/styles.css';
import countryCard from "./country-card.hbs";

const countryContainer = document.querySelector('.country-info');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 300;

searchInput.addEventListener("input",onSearch)

function onSearch(event) {
    event.preventDefault()
}
fetchCountryByName("ukraine")
 .then(renderCountryCard);

function fetchCountryByName(countryName) {
    return fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages `,
      ).then(response => response.json())
}
function renderCountryCard(country) {
    const markup = countryCard(country)
countryContainer.innerHTML = markup;
}