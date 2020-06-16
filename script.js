const apiCountries = "https://restcountries.eu/rest/v2/all";
const loader = document.querySelector('.load');
const countriesSection = document.querySelector('.countries');

console.log(countriesSection);

getCountries(apiCountries);

 async function getCountries(url) {
  const response = await fetch(url);
  const countries = await response.json();
console.log(countries);
  showCountries(countries); 
}


const showCountries = (countries) => {
  loader.style.display = 'none';
  countriesSection.innerHTML = '';

  countries.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('card');

    countryCard.innerHTML = `
            <div>
                <img src="${country.flag}" alt="${country.name}" />
            </div>
            <div class="card-body">
                <h3 class="country-name">${country.name}</h3>
                <p>
                    <strong>Population:</strong>
                    ${country.population}
                </p>
                <p class="country-region">
                    <strong>Region:</strong>
                    ${country.region}
                </p>
                <p>
                    <strong>Capital:</strong>
                    ${country.capital}
                </p>
            </div>
        `;
        countriesSection.appendChild(countryCard); 
    
  });
};

