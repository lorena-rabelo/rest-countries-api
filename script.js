const apiCountries = "https://restcountries.eu/rest/v2/all",
  input = document.querySelector('.inputs__countrie'),
  loader = document.querySelector('.load'),
  countriesSection = document.querySelector('.countries');

getCountries(apiCountries);

async function getCountries(url) {
  const response = await fetch(url);
  const countries = await response.json()
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

input.addEventListener('change', searchCountry);

function searchCountry() {
  const country = input.value.toLowerCase();
  const countries = document.querySelectorAll('.country-name');
  console.log(country);

  countries.forEach((item) => {
    if (item.innerText.toLowerCase() === country){      
     return item.parentElement.parentElement.style.display = 'block';
    } else {
      return item.parentElement.parentElement.style.display = 'none';
    }
  });
}

