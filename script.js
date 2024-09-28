const token="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjI0LCJlbWFpbCI6Im0uc2VycmFub0B1dHAuZWR1LmNvIiwiaWF0IjoxNzI2MDc0ODMzLCJleHAiOjE3NDMzNTQ4MzN9.goHFu6-zAFIWBidc566TNIh9l0wDL0KqhQKV5Rqc9TA"
let editCategoryId = 0;

const categorias = [
  { id: 1, nombre: "Acción" },
  { id: 2, nombre: "Aventura" },
  { id: 3, nombre: "Estrategia" },
  { id: 4, nombre: "Deportes" }
];

// Función para mostrar categorías
function mostrarCategorias() {
  const categoriaContainer = document.getElementById("categorias");
  categorias.forEach(categoria => {
      const div = document.createElement("div");
      div.classList.add("card");
      div.style.width = "12rem";
      div.style.margin = "10px";
      div.innerHTML = `
          <div class="card-body">
              <h5 class="card-title">${categoria.nombre}</h5>
          </div>
      `;
      categoriaContainer.appendChild(div);
  });
}

// Llamar a la función para mostrar categorías al cargar la página
mostrarCategorias();


// Fetch para productos
fetch("https://fake-api-vq1l.onrender.com/posts", {
    headers: {
        "Authorization": token
    }
}).then(res => res.json()).then(res => {
    console.log(res)

    const list = document.getElementById("lista")
    res.forEach(product => {
        console.log(product)
        const li = document.createElement("li")
        const images = JSON.parse(product.images)
        const html = `<div class="card" style="width: 18rem; margin: 10px">
<img src="${images[0]}" class="card-img-top" alt="...">
<div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.description}</p>
    <p class="card-categoria">${product.categoria}</p>
    <p  style="color: red;">${product.value}</p>
    <button type="button" onclick="eliminar(${product.id})" class="btn btn-danger">Eliminar</button>
    <button type="button" onclick="editForm(${product.id},'${product.title}','${product.description}','${product.value}','${images[0]}' )" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal-edit">Editar</button
</div>`
        li.innerHTML = html
        list.appendChild(li)
    });
});

// Función para enviar el formulario de creación de producto
function sendForm() {
  const title = document.getElementById("title");
  const description = document.getElementById("description");
  const value = document.getElementById("value");
  const image = document.getElementById("image");
  const categoriasSeleccionadas = obtenerCategoriasSeleccionadas("categoria");

  const body = {
      title: title.value,
      description: description.value,
      value: value.value,
      images: [image.value],
      categorias: categoriasSeleccionadas 
  };

  fetch("https://fake-api-vq1l.onrender.com/posts", {
      method: "POST",
      headers: {
          "Authorization": token,
          "Content-type": "application/json"
      },
      body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(res => {
      console.log("respuesta de la api", res);
      title.value = "";
      description.value = "";
      value.value = "";
      image.value = "";
      location.reload();
  });
}

function eliminar(id){
    console.log(id)
    fetch(`https://fake-api-vq1l.onrender.com/posts/${id}`, {
        method: "DELETE", 
        headers: {
        "Authorization": token
        },
    })
    .then( res => res.json())
    .then( res => {
        console.log("respuesta de la api", res)
        location.reload();
    })
}

function editForm(id, title, description, value, image) {
    idedit = id;
    const title1 = document.getElementById("title-edit");
    const description2 = document.getElementById("description-edit");
    const value3 = document.getElementById("value-edit");
    const image4 = document.getElementById("image-edit");
    title1.value = title;
    description2.value = description;
    value3.value = value;
    image4.value = image;
}

// Función para guardar los cambios en el producto editado
function saveedit() {
  const title = document.getElementById("title-edit");
  const description = document.getElementById("description-edit");
  const value = document.getElementById("value-edit");
  const image = document.getElementById("image-edit");
  const categoriasSeleccionadas = obtenerCategoriasSeleccionadas("categoria-edit");

  const body = {
      title: title.value,
      description: description.value,
      value: value.value,
      images: [image.value],
      categorias: categoriasSeleccionadas 
  };

  fetch(`https://fake-api-vq1l.onrender.com/posts/${idedit}`, {
      method: "PATCH",
      headers: {
          "Authorization": token,
          "Content-type": "application/json"
      },
      body: JSON.stringify(body)
  })
  .then(res => res.json())
  .then(res => {
      console.log("respuesta de la api", res);
      title.value = "";
      description.value = "";
      value.value = "";
      image.value = "";
      location.reload();
  });
}



// Función para mostrar categorías
function mostrarCategorias() {
    const categoriaContainer = document.getElementById("categorias");
    categoriaContainer.innerHTML = ""; // Limpiar contenedor antes de renderizar
    categorias.forEach(categoria => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.style.width = "12rem";
        div.style.margin = "10px";
        div.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${categoria.nombre}</h5>
                <button type="button" class="btn btn-danger" onclick="eliminarCategoria(${categoria.id})">Eliminar</button>
                <button type="button" class="btn btn-primary" onclick="editCategoriaForm(${categoria.id}, '${categoria.nombre}')" data-bs-toggle="modal" data-bs-target="#modalCategoriaEditar">Editar</button>
            </div>
        `;
        categoriaContainer.appendChild(div);
    });
}



// Función para agregar nueva categoría
function agregarCategoria() {
    const nombreCategoria = document.getElementById("nombreCategoria").value;
    
    // Crear un objeto de nueva categoría
    const nuevaCategoria = {
        id: categorias.length + 1, // Generar un nuevo ID
        nombre: nombreCategoria
    };
    
    categorias.push(nuevaCategoria); // Agregar la nueva categoría al array
    mostrarCategorias(); // Volver a mostrar las categorías actualizadas
    document.getElementById("nombreCategoria").value = ""; // Limpiar el campo
}

// Función para eliminar categoría
function eliminarCategoria(id) {
    const index = categorias.findIndex(categoria => categoria.id === id);
    if (index !== -1) {
        categorias.splice(index, 1); // Eliminar la categoría del array
        mostrarCategorias(); // Actualizar la vista
    }
}

// Función para llenar el formulario de edición de categoría
function editCategoriaForm(id, nombre) {
    editCategoryId = id; // Guardar el ID de la categoría que se está editando
    document.getElementById("nombreCategoriaEditar").value = nombre; // Poner el nombre en el campo de edición
}

// Función para guardar los cambios en la categoría editada
function guardarCategoriaEditada() {
    const nombreCategoria = document.getElementById("nombreCategoriaEditar").value;
    const index = categorias.findIndex(categoria => categoria.id === editCategoryId);

    if (index !== -1) {
        categorias[index].nombre = nombreCategoria; // Actualizar el nombre de la categoría
        mostrarCategorias(); // Actualizar la vista
        document.getElementById("nombreCategoriaEditar").value = ""; // Limpiar el campo
    }
}

function llenarCategorias(selectElementId) {
  const selectElement = document.getElementById(selectElementId);
  selectElement.innerHTML = ""; // Limpiar el select antes de llenarlo

  categorias.forEach(categoria => {
      const option = document.createElement("option");
      option.value = categoria.id;
      option.text = categoria.nombre;
      selectElement.appendChild(option);
  });
}

// Llenar las categorías en el modal de crear producto
document.getElementById("exampleModal").addEventListener("show.bs.modal", function () {
  llenarCategorias("categoria");
});

// Llenar las categorías en el modal de editar producto
document.getElementById("exampleModal-edit").addEventListener("show.bs.modal", function () {
  llenarCategorias("categoria-edit");
});

// Función para capturar las categorías seleccionadas
function obtenerCategoriasSeleccionadas(selectElementId) {
  const selectElement = document.getElementById(selectElementId);
  const selectedOptions = Array.from(selectElement.selectedOptions);
  return selectedOptions.map(option => option.value); 
}
