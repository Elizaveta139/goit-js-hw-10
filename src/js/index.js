//Створи фронтенд частину застосунку для пошуку інформації про кота за його породою.

import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import swal from 'sweetalert';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import '../css/style.css';

const selectRef = document.querySelector('.breed-select');
const loaderRef = document.querySelector('.loader');
const errorRef = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');

selectRef.addEventListener('change', onSelectBreed);

errorRef.classList.add('is-hidden');
loaderRef.classList.replace('loader', 'is-hidden');
catInfo.classList.add('is-hidden');

let arrBreeds = [];

//Колекція порід в select
fetchBreeds()
  .then(data => {
    data.forEach(el => {
      arrBreeds.push({ text: el.name, value: el.id });
      // console.log(arrBreeds);
    });

    new SlimSelect({
      select: selectRef,
      data: arrBreeds,
    });
  })
  .catch(onError);

//При виборі породи - інформація про кота
function onSelectBreed(evt) {
  loaderRef.classList.replace('is-hidden', 'loader');
  catInfo.classList.add('is-hidden');

  const idSelectedBreed = evt.currentTarget.value;
  console.log(idSelectedBreed);

  fetchCatByBreed(idSelectedBreed)
    .then(data => {
      console.log(fetchCatByBreed(idSelectedBreed));
      console.log(data);

      loaderRef.classList.replace('loader', 'is-hidden');

      const { url, breeds } = data[0];

      catInfo.innerHTML = `<div class='div-img'>
                                <img src='${url}' alt='${breeds[0].name}' width=400 height=400>
                            </div>
                            <div class='div-descr'>
                                <h1 class='title'>${breeds[0].name}</h1>
                                <p>${breeds[0].description}</p>
                                <p><b>Temperament: </b>${breeds[0].temperament}</p>
                            </div>`;

      catInfo.classList.remove('is-hidden');
    })
    .catch(onError);
}

//помилка
function onError(error) {
  errorRef.classList.remove('is-hidden');
  loaderRef.classList.replace('loader', 'is-hidden');

  swal('Oops!', 'Something went wrong! Try reloading the page!', 'error');
}
