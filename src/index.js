import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';

const body = document.querySelector('body');
const selectElement = body.querySelector('.breed-select');
const catInfoContainer = body.querySelector('.cat-info');
const loader = body.querySelector('.loader');
const errorElement = body.querySelector('.error');

// Функция для наполнения select опциями
function breedSelect(breeds) {
  const options = breeds.map(breed => {
    const optionElement = document.createElement('option');
    optionElement.value = breed.id;
    optionElement.textContent = breed.name;
    return optionElement.outerHTML;
  });

  selectElement.innerHTML = options.join('\n');
}

// Выполнение запроса и наполнение select при загрузке страницы
window.addEventListener('load', event => {
  loader.classList.remove('hidden'); // Показываем загрузчик
  selectElement.classList.add('hidden'); // Скрываем select
  errorElement.classList.add('hidden'); // Скрываем элемент с ошибкой

  fetchBreeds()
    .then(breeds => {
      breedSelect(breeds);
      loader.classList.add('hidden'); // Скрываем загрузчик после завершения запроса
      selectElement.classList.remove('hidden'); // Показываем select после завершения запроса
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden'); // Показываем элемент с ошибкой
      console.log(error);
    });
});

selectElement.addEventListener('change', event => {
  const breedId = event.target.value;

  catInfoContainer.classList.add('hidden'); // Скрываем информацию о коте
  loader.classList.remove('hidden'); // Показываем загрузчик

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
          loader.classList.add('hidden'); // Скрываем загрузчик после завершения запроса
          catInfoContainer.classList.remove('hidden'); // Показываем информацию о коте после завершения запроса
        })
        .catch(error => {
          console.log(error);
          loader.classList.add('hidden');
          errorElement.classList.remove('hidden'); // Показываем элемент с ошибкой
        });
    })
    .catch(error => {
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden'); // Показываем элемент с ошибкой
      console.log(error);
    });
});
