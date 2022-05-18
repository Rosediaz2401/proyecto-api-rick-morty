
const name = document.querySelector('#name')
const status = document.querySelector('#status')
const species = document.querySelector('#species')
const gender = document.querySelector('#gender')
const image = document.querySelector('#image')
const addCharacter = document.querySelector('#add-character-form')
const add = document.querySelector('#add')

add.addEventListener('click', function(e){
    e.preventDefault()
   
    const character = {}
    character.name = name.value;
    character.status = status.value;
    character.species = species.value;
    character.gender = gender.value;
    character.image = image.value;

     
    fetch('http://localhost:5000/api/characters',{
        method: 'POST',
        body: JSON.stringify(character),
        header:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
})
