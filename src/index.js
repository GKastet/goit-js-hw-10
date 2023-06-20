import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const elements = {
    select: document.querySelector('.breed-select'),
    catInfo: document.querySelector('.cat-info'),
    loader: document.querySelector('.loader'),
    error: document.querySelector('.error'),
}

elements.loader.hidden = false;
elements.error.hidden = true;
elements.catInfo.setAttribute('hidden', '')

fetchBreeds().then((results)=>{
    elements.loader.hidden = true;
    elements.select.removeAttribute('hidden');
    elements.select.insertAdjacentHTML('beforeend', createMarkUpSelect(results))    
}).catch(error =>{
    elements.select.setAttribute('hidden', '');
    elements.error.hidden = false;

    console.log('error');
});

function createMarkUpSelect(arr){
    return arr.map(element => {
        return `<option value="${element.id}">${element.name}</option>`               
    });    
}

elements.select.addEventListener('change', handlerSelect);

function handlerSelect(evt){
    elements.catInfo.setAttribute('hidden', '')
    const catBreed = evt.target.value
    elements.loader.hidden = false;
    fetchCatByBreed(catBreed).then((results)=>{        
        elements.loader.hidden = true;
        createMarkUp(results)
        elements.catInfo.removeAttribute('hidden');
        elements.catInfo.innerHTML = createMarkUp(results);
    }).catch(error =>{
        elements.select.setAttribute('hidden', '');
        elements.error.hidden = false;
    }) 
}

function createMarkUp(arr){   
    return arr.map(({url, breeds}) => {        
        const {name, description, temperament} = breeds[0];
        return `
        <img src="${url}" alt="#" width = "300">
        <h3>${name}</h3>
        <p>Description: ${description}</p>
        <p>Temperament: ${temperament}</p> `       
    });    
}

 
    