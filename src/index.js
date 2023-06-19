import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const elements = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

elements.loader.hidden = false;
elements.error.hidden = true;
//elements.select.setAttribute('hidden', '')
elements.catInfo.setAttribute('hidden', '')

fetchBreeds().then((results)=>{
    elements.loader.hidden = true;
    elements.select.removeAttribute('hidden');
    elements.select.insertAdjacentHTML('beforeend', createMarkUpSelect(results))    
});

function createMarkUpSelect(arr){
    return arr.map(element => {
        //console.log(element);
        return `<option value="${element.id}">${element.name}</option>`               
    });    
}

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt){
    elements.catInfo.setAttribute('hidden', '')
    //console.log(evt.target.value);
    const catBreed = evt.target.value
    elements.loader.hidden = false;
    fetchCatByBreed(catBreed).then((results)=>{
        //console.log(results);
        elements.loader.hidden = true;
        createMarkUp(results)
        elements.catInfo.removeAttribute('hidden');
        elements.catInfo.innerHTML = createMarkUp(results);
    }) 
}

function createMarkUp(arr){
    //console.log(arr[0]);
    return arr.map(({url, breeds}) => {
        //console.log(breeds[0].temperament);
        const {name, description, temperament} = breeds[0];
        return `
        <img src="${url}" alt="#" width = "300">
        <h3>${name}</h3>
        <p>Description: ${description}</p>
        <p>Temperament: ${temperament}</p> `       
    });    
}

 
    