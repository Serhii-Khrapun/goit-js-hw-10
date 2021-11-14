function fetchCountryByName(countryName) {
  return fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fields=name,capital,population,flags,languages `,
  ).then(response => {
    if (!response.ok) {
      throw Error(response.statusText);
    }

    return response.json();
  });
}
export default { fetchCountryByName };