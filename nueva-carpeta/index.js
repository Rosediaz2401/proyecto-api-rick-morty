const lista = document.getElementById('lista')
const url = "https://rickandmortyapi.com/api/character"

function fetchRick(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
       const sdRick = data.results 
       console.log(data.results)  
        sdRick.forEach((data,i) => 
        fetch(url)
        .then(response => response.json())
               
        )
    });
}
fetchRick()

// fetch(url)
// .then((res) => res.json())
// console.log("si llega")
// .then(data => {
//     data.forEach(item => console.log('funciona'))
// })