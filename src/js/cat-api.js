const url = 'https://api.thecatapi.com/v1';
const api_key =
  'live_j6Hl1zSRTe4gdO9w1lWkBrIpEMHEDzeykcs7QHzCuF1dhSQUHj9IIvraDLzXsWgA';

//
export function fetchBreeds() {
  return fetch(`${url}/breeds?api_key=${api_key}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(
    `${url}/images/search?api_key=${api_key}&breed_ids=${breedId}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
