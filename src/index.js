import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const body = document.querySelector('body');
const selectElement = body.querySelector('.breed-select');
const catInfoContainer = body.querySelector('.cat-info');
const loader = body.querySelector('.loader');
const errorElement = body.querySelector('.error');

function breedSelect(breeds) {
  console.log(breeds);
  const selectItems = breeds.map(({ name, id }) => {
    return `<option value="${id}">${name}</option>`;
  });
  console.log(selectItems);
  selectElement.innerHTML = selectItems.join('');
}

// Выполнение запроса и наполнение select при загрузке страницы
window.addEventListener('load', event => {
  loader.classList.remove('hidden');
  selectElement.classList.add('hidden');
  errorElement.classList.add('hidden');

  fetchBreeds()
    .then(breeds => {
      breedSelect(breeds);
      loader.classList.add('hidden');
      selectElement.classList.remove('hidden');
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden');
      console.log(error);
    });
});

selectElement.addEventListener('change', event => {
  const breedId = event.target.value;

  catInfoContainer.classList.add('hidden');
  loader.classList.remove('hidden');

  fetchBreeds()
    .then(response => {
      const breeds = response;
      // Ищем соответствующую породу по id
      const breed = breeds.find(item => item.id === breedId);

      fetchCatByBreed(breedId)
        .then(data => {
          catInfoContainer.innerHTML = `
            <img src="${data.url}" alt="Cat" width = "560">
            <h2>${breed.name}</h2>
            <p>Description: ${breed.description}</p>
            <p>Temperament: ${breed.temperament}</p>
          `;
          loader.classList.add('hidden');
          catInfoContainer.classList.remove('hidden');
        })
        .catch(error => {
          console.log(error);
          loader.classList.add('hidden');
          errorElement.classList.remove('hidden');
        });
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden');
      console.log(error);
    });
});
