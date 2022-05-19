const d = document
const lista = d.querySelector('#lista')
const name = d.querySelector('#name')
const status = d.querySelector('#status')
const species = d.querySelector('#species')
const gender = d.querySelector('#gender')
const image = d.querySelector('#image')
const addCharacter = d.querySelector('#add-character-form')
const add = d.querySelector('#add')
const url = 'http://localhost:5000/api/characters'

add.addEventListener('click', (e) => {
    e.preventDefault()
    console.log(e);

    const character = {}
    character.name = name.value;
    character.status = status.value;
    character.species = species.value;
    character.gender = gender.value;
    character.image = image.value;
    
const sendData = () => {     
    fetch(url,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(character),
    })
    .then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}
sendData()
})

const printData = () => {
fetch(url)
.then((res) => res.json())
.then(data => {
    data.forEach(item => lista.innerHTML += `
    <div class="a-box">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew" id="rick">
            <img src=${item.image}>
            </div>
          </div>
        </div>
        <div class="text-container" id="name">
            <div> ${item.status}</div>
            <div> ${item.species}</div>
            <div>${item.gender}</div>
            
           <div id="specie">
          </div>  
        </div>
    <li class="list-items name">${item.name}</li>
    <button class="btns">Edit</button>
    <button class="btns" data-id="${item._id}" class="remove">Delete</button>`)
    const deleteBtn = d.getElementsByClassName('remove')
    const buttons = Array.from(deleteBtn)
    buttons.forEach((btn => {
        btn.addEventListener('click', (e) => {
            deleteData(e.target.dataset.id)
        })
    }))
})
}
printData()


const deleteData = (id) => {
    console.log(id)
    fetch(url +  '/' +id, {
        method:'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => console.log(data))
    
}

// const imagen = document.getElementById('rick')
// fetch('http://localhost:5000/api/characters/')
// .then((res) => res.json())
// .then(data => {
//     console.log(data);
//     // data.forEach(item => lista.innerHTML += `<li>${item.name}</li>`)
//     // data.forEach(item => lista.innerHTML += `<li>${item.species}</li>`)
//     // data.forEach(item => lista.innerHTML += `<li>${item.status}</li>`)
//     data.forEach(item => imagen.innerHTML += `<img src=${item.image}>`)

// })
