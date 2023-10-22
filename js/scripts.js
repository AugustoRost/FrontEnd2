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
        card.innerHTML = `
        <div class="d-flex align-content-center card text-start border border-success rounded bg-transparent mt-4 pb-5" style="width: 18rem;" id"tamanhoCard">
        <img src="${character.image}" class="card-img-top" alt="...">
        <div class="card-body p-0">
        <p class="card-text text-white pt-4">${character.name}<br>${character.status} - ${character.species}</p>
        <p class="card-text text-white"><span class="text-dark-emphasis">Ultima localizacao conhecida</span> <br>${character.location.name}</p>
        <p class="card-text text-white"><span class="text-dark-emphasis">Visto a ultima vez em:</span> <br>${character.location.name}</p>
        </div>`
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
