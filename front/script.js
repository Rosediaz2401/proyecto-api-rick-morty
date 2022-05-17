const lista = document.getElementById('lista')

fetch( 'http://localhost:5000/api/characters')
.then((res) => res.json())
.then(data => {
    data.forEach(item => lista.innerHTML += `<li>${item.name}</li>`)
})