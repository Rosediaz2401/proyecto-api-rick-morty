console.log('hola');
const d = document;
const lista = d.querySelector("#lista");
const listaSingle = d.querySelector("#lista-single");
const name = d.querySelector("#name");
const status = d.querySelector("#status");
const species = d.querySelector("#species");
const gender = d.querySelector("#gender");
const image = d.querySelector("#image");
const addCharacter = d.querySelector("#add-character-form");
const add = d.querySelector("#add");
const editar = d.querySelector("#editar");
const url = "https://api-rick-proyecto-dev-2022.herokuapp.com/api/characters";

if (add) {
  add.addEventListener("click", (e) => {
    e.preventDefault();

  const character = {};
  character.name = name.value;
  character.status = status.value;
  character.species = species.value;
  character.gender = gender.value;
  character.image = image.value;

  const sendData = () => {
    fetch(url, {
      method: "POST",
      headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
},
      body: JSON.stringify(character),
    })
      .then((res) => res.json())
      .then(() => window.location.reload())
      .catch((error) => console.error("Error:", error))
  };
  sendData();
  });
}

const isIndex = !window.location.pathname.includes("edit");
if (isIndex) {
  const printData = () => {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach(
      (item) =>
      (lista.innerHTML += `
        <div class="a-box">
        <div class="img-container">
        <div class="img-inner">
        <div class="inner-skew" id="rick">
        <img src= ${checkIfJPEG(item.image)}>
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
      );

const editBtn = d.getElementsByClassName("edit");
const editInfo = Array.from(editBtn);
  editInfo.forEach((info) => {
  info.addEventListener("click", (e) => {
  window.location.href = `edit.html?id=${e.target.dataset.id}/`;
  });
  });
const deleteBtn = d.getElementsByClassName("remove");
const buttons = Array.from(deleteBtn);
  buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    deleteData(e.target.dataset.id);
  });
  });
    });
  };
  printData();
}

const deleteData = (id) => {
  console.log(id);
  fetch(url + "/" + id, {
    method: "DELETE",
    headers: {
    "Content-Type": "application/json",
},
  })
  .then((res) => res.json())
  .then((data) => window.location.reload());
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

if (id) {
  const miId = id.split("/")[0];
  fetch(url + "/" + miId)
    .then((res) => res.json())
    .then((item) => {
      name.value = item.name;
      status.value = item.status;
      species.value = item.species;
      gender.value = item.gender;
      image.value = item.image;

      listaSingle.innerHTML += `  <div class="a-box">
        <div class="img-container">
        <div class="img-inner">
        <div class="inner-skew" id="rick">
        <img src=${checkIfJPEG(item.image)}>
        </div>
        </div>
        </div>
        <div class="text-container" id="name">
        <li class="list-items name">${item.name}</li>
        <li class="list-items"> ${item.status}</li>
        <li class="list-items"> ${item.species}</li>
        <li class="list-items">${item.gender}</li> 
        </div>
        `;
    });

 const btnEdit = d.querySelector("#editar");
  btnEdit.addEventListener("click", (e) => {
  e.preventDefault();
    fetch(url + "/" + miId, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
  },
      body: JSON.stringify({
      name: name.value,
      status: status.value,
      species: species.value,
      gender: gender.value,
      image: image.value,
      }),
    }).then((response) => response.json()
      .then(() => window.location.reload()));
  });
}

function checkIfJPEG(image) {
  const urlImg ="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQF5x5Ac3B7lSh8t5H9foHldZLxiMaOL7BVsDo4K3k7j1eg5_7CCObJcSJyg752UL_qAjs&usqp=CAU";
  console.log(image.includes(".jpeg"));
  return image.includes("jpeg") || image.includes("png") || image.includes("jpg") ? image : urlImg;
}
