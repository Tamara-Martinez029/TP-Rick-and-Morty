const root = document.getElementById("root");
const totalPersonajes = document.getElementById("total-personajes");
let pagina= 1;
let total = 0;

//Filtros
const todos = document.getElementById("todos");
const mujeres = document.getElementById("mujeres");
const hombres = document.getElementById("hombres");
const sinGenero = document.getElementById("sinGenero");
const noSeSabe = document.getElementById("noSeSabe");
//Paginado

const paginaActual = document.getElementById("pagina-actual");
const proximaPagina = document.getElementById("next-page");
const prevPagina = document.getElementById("prev-page");
const totalPaginas = document.getElementById("total-paginas");
const primerPagina = document.getElementById("first-page");
const ultimaPagina = document.getElementById("last-page");
// ver mas




/* const vermas = document.getElementById("btnVerMas") */

const getData = async () => {

    const URL = `https://rickandmortyapi.com/api/character?page=${pagina}`;
    const response = await fetch(URL);
    const json = await response.json();
  
    total = json.info.pages;

  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  printData(json.results);
  data = json;
  updatePagination()
  return json;
  
};


getData(pagina);
let data = {};

const printData = (arr) => {
  console.log(arr);
  let card = "";
  totalPersonajes.innerHTML = arr.length;
  arr.forEach((personaje) => {
    console.log(personaje);
    card =
      card + `
      
      <div>
      <div class="card">
      
      <div class="imagenPerfil">
      <img class="imagenPersonaje" src=${personaje.image} alt="">
  </div>
  <div class="informacion">
  <p>Nombre: ${personaje.name} </p>
  <p>Género: ${personaje.gender === "Female" ? "Mujer" : "" ||
     personaje.gender === "Male" ? "Hombre" : "" || 
     personaje.gender === "Genderless" ? "Sin Genero" : "" || 
     personaje.gender === "unknown" ? "Desconocido" : ""} </p>
  <p>Especies: ${personaje.species}</p>
  <p>Status: ${personaje.status === "Alive" ? "Vivo" : "" || 
     personaje.status === "Dead" ? "Muerto" : "" ||
     personaje.status === "unknown" ? "Desconocido" : ""}</p>
  <p>Origen: ${personaje.origin.name} </p>
  <p>Locación: ${personaje.location.name}</p>
</div>
 <div class="accion"  id="btnVerMas"><a class="link" href="https://rickandmortyapi.com/api/character/${personaje.id}">VER MÁS...</a> </div> 
    </div>
</div>
</div>
`
});
root.innerHTML = card;
};
const pagination = async (prom) => {
  const result = await prom;
  proximaPagina.addEventListener("click", () => {
    pagina += 1;
    getData();
  });

  prevPagina.addEventListener("click", () => {
    pagina -= 1;
    getData();
  });

  primerPagina.addEventListener("click", () => {
    if (pagina >= 2) {
      pagina = 1;
      getData();
    }
  });
  ultimaPagina.addEventListener("click", () => {
    if (pagina < result.info.pages) {
      pagina = result.info.pages;
      getData();
    }
  });
};


const updatePagination = () => {
  if (pagina <= 1) {
  
    prevPagina.disabled = true;
    primerPagina.disabled = true;
  } else {
    prevPagina.disabled = false;
    primerPagina.disabled = false;
  }

  if (pagina === total) {
    ultimaPagina.disabled = true;
    proximaPagina.disabled = true;
  } else {
    ultimaPagina.disabled = false;
    proximaPagina.disabled = false;
  }
};


 
mujeres.addEventListener("click", () => {
  const arr = data.results;
  const arrMujeres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Female") {
      arrMujeres.push(arr[i]);
    }
  }

  printData(arrMujeres);
});

hombres.addEventListener("click", () => {
  const arr = data.results;
  const arrHombres = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Male") {
      arrHombres.push(arr[i]);
    }
  }
  printData(arrHombres);
});

sinGenero.addEventListener("click", () => {
  const arr = data.results;
  const arrSinGenero = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "Genderless") {
      arrSinGenero.push(arr[i]);
    }
  }
  printData(arrSinGenero);
});

noSeSabe.addEventListener("click", () => {
  const arr = data.results;
  const arrNoSeSabe = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].gender === "unknown") {
      arrNoSeSabe.push(arr[i]);
    }
  }
  printData(arrNoSeSabe);
});

 todos.addEventListener("click", () => {
  const arr = data.results;
  printData(arr);
}); 
 

  pagination(getData());


  