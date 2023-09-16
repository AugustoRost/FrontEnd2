const characterList = document.getElementById('characterslist')
const searchByName = document.getElementById('searchByNome')
const pagination = document.getElementById('pagination')
const buttonNext = document.getElementById('buttonNext')
const buttonPrev = document.getElementById('buttonPrev')

async function getApi () {
    try {
        const response = await api.get("/character")
        const characters = response.data.results
        const info = response.data.info
        showcaracters (characters)
        console.log(response.data)
        displayPagination (info)
} catch {
    console.log ("error")
}
}
 function showcaracters (characters) {
    characters.forEach(character => {
        const card = document.createElement('div')
        card.classList.add('card')

        card.innerHTML = `
        <img src="${character.image}" />
        <h2>${character.name}<h2>
        <p>${character.status} - ${character.species}</p>
        <p>Last Location</p>
        <p>${character.location.name}</p>`
        characterList.appendChild(card)
    })
 }
 function displayPagination(info){
     buttonNext.addEventListener('click', ()=> {
 
     })
    buttonPrev.addEventListener('click', ()=> {

    })
 }
getApi()
