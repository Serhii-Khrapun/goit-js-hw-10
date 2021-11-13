import './css/styles.css';
import countryCard from "./country-card.hbs";
import debounce from "lodash.debounce";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const countryContainer = document.querySelector('.country-info');
const searchInput = document.querySelector('#search-box');

const DEBOUNCE_DELAY = 1000;

searchInput.addEventListener("input",debounce(onSearch,DEBOUNCE_DELAY))

function onSearch(event) {
   const searchCountry = searchInput.value;
   fetchCountryByName(searchCountry)
   .then(renderCountryCard)
   .catch(showError)
  
}

function showError(params) {
    Notify.failure("Oops, there is no country with that name");
}

function fetchCountryByName(countryName) {
    return fetch(
        `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages `,
      ).then(response => {
          if(!response.ok){
              throw Error(response.statusText)
          }
         return response.json()
      })
}
function renderCountryCard(country) {
    const markup = countryCard(country)
countryContainer.innerHTML = markup;
}