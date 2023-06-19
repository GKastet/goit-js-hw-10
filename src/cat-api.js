//x-api-key
//'api_key=live_SJWzhgZgj5uFzJ1aduBYqjxoRlvofKSr4uT2gAA9cSTe9uOKC5ffekGNalTXFO54'
//https://api.thecatapi.com/v1/images/search?api_key=YOUR_API_KEY
const BASE_URL = `https://api.thecatapi.com/v1`;
const API_KEY = 'api_key=live_SJWzhgZgj5uFzJ1aduBYqjxoRlvofKSr4uT2gAA9cSTe9uOKC5ffekGNalTXFO54';

function fetchBreeds(){
    const END_POINT =`/breeds`;
    const URL = `${BASE_URL}${END_POINT}?${API_KEY}`;
    //console.log(URL);

    return fetch(URL).then((responce)=>{
        //console.log(responce);
        if(!responce.ok){
            reject();
        }
        return responce.json();
    })
}

function fetchCatByBreed(breedId){
    const END_POINT = `/images/search`;
    const SELECT_BREED = '?breed_ids';
    const URL_BREED = `${BASE_URL}${END_POINT}${SELECT_BREED}=${breedId}&${API_KEY}`
    //console.log(URL_BREED);

    return fetch(URL_BREED).then((responce)=>{
        //console.log(responce);
        return responce.json();
    })
}
fetchCatByBreed()
export {fetchBreeds};
export {fetchCatByBreed};