import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_Xh9dgQSekoRNqqCzD1kKjEXGV0Bx8cGc2yphu8jyoZ65sFSfVAgZX2WdnnX36E2E';

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds', {
      headers: {
        Authorization:
          'live_Xh9dgQSekoRNqqCzD1kKjEXGV0Bx8cGc2yphu8jyoZ65sFSfVAgZX2WdnnX36E2E',
      },
    })
    .then(response => {
      if (response.status !== 200) {
        throw new Error(response.status);
      }
      return response.data;
    })
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden'); // Показываем элемент с ошибкой
      throw error; // Пробрасываем ошибку дальше для обработки
    });
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => data[0])
    .catch(error => {
      console.log(error);
      loader.classList.add('hidden');
      errorElement.classList.remove('hidden'); // Показываем элемент с ошибкой
      throw error; // Пробрасываем ошибку дальше для обработки
    });
}
