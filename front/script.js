const d = document
const lista = d.querySelector('#lista')
const listaSingle = d.querySelector('#lista-single')
const name = d.querySelector('#name')
const status = d.querySelector('#status')
const species = d.querySelector('#species')
const gender = d.querySelector('#gender')
const image = d.querySelector('#image')
const addCharacter = d.querySelector('#add-character-form')
const add = d.querySelector('#add')
const editar = d.querySelector('#editar')
const url = 'http://localhost:5000/api/characters'


if(add){
    add.addEventListener('click', (e) => {
        e.preventDefault()
        //console.log(e);
    
        //valores input
        const character = {}
        character.name = name.value;
        character.status = status.value;
        character.species = species.value;
        character.gender = gender.value;
        character.image = image.value;
    
    // Post agregar un nuevo character
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
}


// Trae a los personajes al HTML, hace recorrido y los va agregando con sus respectivos datos
const isIndex = window.location.pathname.includes('index');
if(isIndex){
    const printData = () => {
        fetch(url)
        .then((res) => res.json())
        .then(data => {
            data.forEach(item => lista.innerHTML += `
            <div class="a-box">
                <div class="img-container">
                  <div class="img-inner">
                    <div class="inner-skew" id="rick">
                    <img src= ${item.image}>
                    </div>
                  </div>
                </div>
                <div class="text-container" id="name">
                <li class="list-items name">${item.name}</li>
                <li class="list-items"> ${item.status}</li>
                <li class="list-items"> ${item.species}</li>
                <li class="list-items">${item.gender}</li> 
                </div>
            <button class=" edit btns"  data-id="${item._id}">Edit</button>
            <button class="remove btns" data-id="${item._id}">Delete</button>`)
                       
            //boton editar en cards
            const editBtn = d.getElementsByClassName('edit')
            const editInfo = Array.from(editBtn)
            editInfo.forEach((info => {
                info.addEventListener('click',(e) => {
                    //redirigir a pagina edit.html
                    window.location.href =`edit.html?id=${e.target.dataset.id}/`
                })
            }))
            //boton eliminar en tarjetas
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
}

// Delete, eliminar characters
const deleteData = (id) => {
    console.log(id)
    fetch(url +  '/' +id, {
        method:'DELETE',
        headers: {
            'Content-Type' : 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => window.location.reload())
    
}



//mostrar id al dar click en edit para poder enviarlo a edit.html
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id')


// jalar info a la pagina de editar/UPDATE
if(id){
    const miId = id.split('/')[0]
    fetch(url + '/' + miId)
    .then((res) => res.json())
    .then(item => {
        name.value = item.name
        status.value = item.status
        species.value = item.species
        gender.value = item.gender
        image.value = item.image

        listaSingle.innerHTML += `  <div class="a-box">
        <div class="img-container">
          <div class="img-inner">
            <div class="inner-skew" id="rick">
            <img src=${item.image}>
            </div>
          </div>
        </div>
        <div class="text-container" id="name">
        <li class="list-items name">${item.name}</li>
        <li class="list-items"> ${item.status}</li>
        <li class="list-items"> ${item.species}</li>
        <li class="list-items">${item.gender}</li> 
        </div>
        `
    })

    const btnEdit = d.querySelector('#editar')
    btnEdit.addEventListener('click', (e) =>{
        e.preventDefault()
        fetch(url + '/' + miId, {
                    method: 'PUT',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body : JSON.stringify ({
                        'name' : name.value,
                        'status' : status.value,
                        'species' : species.value,
                        'gender' : gender.value,
                        'image' : image.value,
                    })
                })
                .then(response => response.json()
                .then(item=> window.location.reload()))
    })
}

            // Agregar imagen por defecto cuando no ingresan URL
            // const noImageAdded = () => {
            // const noImage = image.split('avatar')[1].split('.')[1] === 'jpeg'
            // const urlImg = 'https://rickandmortyapi.com/api/character/avatar/19.jpeg'
            // if(image === ' '){
            // console.log('vacio');
            // }else{
            // return(urlImg);
            // }
            // }
            // noImageAdded()
