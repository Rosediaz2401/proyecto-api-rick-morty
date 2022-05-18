const d = document
const name = d.querySelector('#name')
const status = d.querySelector('#status')
const species = d.querySelector('#species')
const gender = d.querySelector('#gender')
const image = d.querySelector('#image')
const addCharacter = d.querySelector('#add-character-form')
const add = d.add('#add')

add.addEventListener('click', function(e){
    e.preventDefault()

    const character = {}
    character.name = name.value;
    character.status = status.value;
    character.species = species.value;
    character.gender = gender.value;
    character.image = image.value;
    console.log(character);
})
