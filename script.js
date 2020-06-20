const apiCountries = "https://restcountries.eu/rest/v2/all",
  input = document.querySelector('.inputs__countrie'),
  loader = document.querySelector('.load'),
  option = document.querySelectorAll('option'),
  select = document.querySelector('select')
  card = document.querySelector('.card'),
  base = document.html,
  changeColorMode = document.querySelector('.color_mode'),
  textColorMode = document.querySelector('h4'),
  inputSection = document.querySelector('.inputs'),
  errorMensagem = document.querySelector('.noResult'),
  countriesSection = document.querySelector('.countries');

input.addEventListener('change', searchCountry);
select.addEventListener('change', filterRegion)
getCountries(apiCountries);

changeColorMode.addEventListener('click', () => {
  // console.log('testado');
  document.body.classList.toggle('dark');
  if (textColorMode.innerText === 'Dark Mode') {
    textColorMode.innerText = 'Light Mode';
  } else {
    textColorMode.innerText = 'Dark Mode';
  }
});

function filterRegion(e) {
  const item = e.target;
  const countryRegion = document.querySelectorAll('.country-region');
  console.log(item.value);

  countryRegion.forEach((region) => {
    if (region.innerHTML.toLowerCase().includes(item.value)) {
      return region.parentElement.parentElement.style.display = 'block';
    } else {
      return region.parentElement.parentElement.style.display = 'none';
    }
  })
}

async function getCountries(url) {
  const response = await fetch(url);
  const countries = await response.json()
  showCountries(countries);
}

const showCountries = (countries) => {
  loader.style.display = 'none';
  errorMensagem.style.display = 'none';

  countries.forEach(country => {
    const countryCard = document.createElement('div');
    countryCard.classList.add('card');
    // countryCard.classList.add('dark');

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

    countryCard.addEventListener('click', () => {
      select.style.display = "none"
      input.style.display = "none"
      countriesSection.innerHTML = ''
      const buttonBack = document.createElement('a')
      const detailCountry = document.createElement('div')
      buttonBack.innerHTML = `<i class="fas fa-arrow-left"></i><h5>Back</h5>`
      buttonBack.href = "https://countries-api-lorena.netlify.app/"
      buttonBack.classList.add('buttonBack')
      detailCountry.classList.add('detail')
      countriesSection.appendChild(detailCountry);
      inputSection.appendChild(buttonBack);

      detailCountry.innerHTML = ` 
        <div>
          <img src="${country.flag}" alt="${country.name}" />
        </div>
        <div class="infos">
          <h3 class="country-name">${country.name}</h3>
          <p class="country-native-name">
              <strong>Native Name:</strong>
               ${country.nativeName}
          </p>
          <p>
            <strong>Population:</strong>
             ${country.population}
          </p>
          <p class="country-region">
            <strong>Region:</strong>
            ${country.region}
          </p>
          <p class="country-subregion">
             <strong>Sub Region:</strong>
             ${country.subregion}  
          </p>
          <p>
             <strong>Capital:</strong>
            ${country.capital}
          </p>
             <p class="country-subregion">
             <strong>Top Level Domain:</strong>
            ${country.topLevelDomain[0]}
          </p>
        <p class="country-subregion">
            <strong>Currencies:</strong>
            ${country.currencies.map((currency) => currency.code)}  
        </p>
            <p class="country-subregion">
           <strong>Languages:</strong>
           ${country.languages.map((language) => language.name)}
          </p>
        </div> 
       `
    })
  });
};


function searchCountry() {
  const country = input.value.toLowerCase();
  const countries = document.querySelectorAll('.country-name');
  console.log(errorMensagem)
  countries.forEach((item) => {
    if (item.innerText.toLowerCase() === country) {
      return item.parentElement.parentElement.style.display = 'block';
    } else {
      errorMensagem.style.display = 'block';
      return item.parentElement.parentElement.style.display = 'none';
    }
  });
}