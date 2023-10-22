const characterList = document.getElementById('characterslist')
const searchByName = document.getElementById('searchByName')
const pagination = document.getElementById('pagination')
const buttonNext = document.getElementById('buttonNext')
const buttonPrev = document.getElementById('buttonPrev')
const footerTop = document.getElementById('footerTop')

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

        <div data-bs-toggle="modal" data-bs-target="#exampleModal-${character.id}" class="d-flex align-content-center card text-start border border-success rounded bg-transparent mt-4 pb-5" style="width: 18rem;" id"tamanhoCard">
        <img src="${character.image}" class="card-img-top" alt="...">
        <div class="card-body p-0">
        <p class="card-text text-white pt-4">${character.name}<br>${character.status} - ${character.species}</p>
        <p class="card-text text-white"><span class="text-dark-emphasis">Ultima localizacao conhecida</span> <br>${character.location.name}</p>
        <p class="card-text text-white"><span class="text-dark-emphasis">Visto a ultima vez em:</span> <br>${character.location.name}</p>
        </div>
        
        <div class="modal fade" id="exampleModal-${character.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">${character.name}</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
              <img src="${character.image}" class="card-img-top" alt="...">
              <div class="card-body p-0">
              <p class="card-text text-dark pt-4">${character.name}<br>${character.status} - ${character.species}</p>
              <p class="card-text text-dark"><span class="text-dark-emphasis">Ultima localizacao conhecida</span> <br>${character.location.name}</p>
              <p class="card-text text-dark"><span class="text-dark-emphasis">Visto a ultima vez em:</span> <br>${character.location.name}</p>
              </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        `
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
fillFooter()

async function fillFooter() {
 try {
    const responseCharacters = await fetch(
        'https://rickandmortyapi.com/api/character'
    ).then((value) => value.json());
    const responseLocations = await fetch(
        'https://rickandmortyapi.com/api/location'
    ).then((value) => value.json());
    const responseEpisodes = await fetch(
        'https://rickandmortyapi.com/api/episode'
    ).then((value) => value.json());
    footerTop.innerHTML = `
    <div class="container-fluid d-flex flex-column justify-content-center" >
    <div class="row text-center p-5" id="bg-footer">
        <div class=" offset-3 col-2 text-success p-0">
            PERSONAGENS: <span class="text-white">${responseCharacters.info.count}</span>
        </div>
        <div class="col-2 text-success p-0">
            LOCALIZACOES: <span class="text-white">${responseLocations.info.count}</span>
        </div>
        <div class="col-2 text-success p-0">
            EPISODIOS: <span class="text-white">${responseEpisodes.info.count}</span>
        </div>
        <div class="text-success text-center mt-5">
            Desenvolvido por: <span class="text-white">Augusto Rost</span> em 2023
        </div>
    </div>
</div>
    `;
    } catch (error) {} 
}

