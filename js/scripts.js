const characterList = document.getElementById('characterslist')
const searchByName = document.getElementById('searchByName')
const pagination = document.getElementById('pagination')
const buttonNext = document.getElementById('buttonNext')
const buttonPrev = document.getElementById('buttonPrev')

let currentPage = 1

async function fetchCharacter (page = 1, name = '') {
    try {
        const params = {
            page,
            name
        }
        const response = await api.get("/character", {
            params
        })
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
    characterList.innerHTML = ''
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
     buttonPrev.addEventListener('click', ()=> {
        if (currentPage > 1) {
            currentPage--
            fetchCharacter(currentPage)
        }
     })
     buttonNext.addEventListener('click', ()=> {
        if (currentPage < info.pages) {
            currentPage++
            fetchCharacter(currentPage)
        }
     })
 }

 searchByName.addEventListener('input', () =>{
    currentPage = 1
    fetchCharacter(currentPage, searchByName.value)
 })

fetchCharacter()


