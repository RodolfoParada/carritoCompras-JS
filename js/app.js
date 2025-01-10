const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); 
const listaCursos = document.querySelector('#lista-cursos'); 
let articulosCarrito = []; 

cargarEventListeners()
function cargarEventListeners(){
       // cuando agregas un curso presionando "Agregar al carrito"
       listaCursos.addEventListener('click', agregarCurso); 

       //Elimina cursos del carrito
       carrito.addEventListener('click', eliminaCurso); 

       // Muestra los Cursos de local storage
       document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];

        carritoHTML();
       })

       //Vaciar el carrito
       vaciarCarritoBtn.addEventListener('click', () => {
               articulosCarrito = []; // resetamos el arreglo

               limpiarHTML(); // Eliminamos todo el HTML
       })
}

// funciones
function agregarCurso(e){
     e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
     
    }
 
}

// Elimina un curso del carrito
function eliminaCurso(e){

  if(e.target.classList.contains('borrar-curso')){
    const cursoId = e.target.getAttribute('data-id');
    
    //Eliminar del arreglo de articulosCarrito por el data-id
    articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId); 

    carritoHTML(); 
  }
}  

// Lee el contenido HTL al que le dimos click y extrae la información del curso
function leerDatosCurso(curso){
  //console.log(curso)
  
  // crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector('img').src, 
    titulo:curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'), 
    cantidad: 1 
  }
  
  // Revisa si un elemento ya existe en el carrito
  // some permite iterar sobre un arreglo de objetos y verificar si un elemento existe con el mismo id.
const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); 
if(existe){
    // Actualizamos la cantidad
    // map crear un nuevo arreglo
    const cursos = articulosCarrito.map(curso => {
      if(curso.id === infoCurso.id){
        curso.cantidad++; 
        return curso;  // retorna el objeto actualizado
      }else {
        return curso; // retorna los objetos que no son los duplicados
      }
    }); 
    articulosCarrito = [...cursos]

}else{
    //Agrega elementos al arreglo de carrito
articulosCarrito = [...articulosCarrito, infoCurso]; 
}


  // Agrega elementos al arreglo de carrito
//   articulosCarrito = [...articulosCarrito, infoCurso]; 
//   console.log(articulosCarrito); 
  carritoHTML(); 
}




// Muestra el Carrito de compras en el HTML
function carritoHTML(){
    //limpiar el HTML
       limpiarHTML(); 

    articulosCarrito.forEach(curso => {
        const {imagen, titulo, precio, cantidad, id } = curso; 
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <img src="${curso.imagen}">
        </td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
         <td>
              <a href="#" class="borrar-curso" data-id="${id}">X</a>
         </td>
        `;

        // Agrega el HTML del carrito en el body
        contenedorCarrito.appendChild(row) 
    }); 

    //Agregar el carrito de compras al storage
    sincronizarStorage(); 
}     

function sincronizarStorage(){
  localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

function limpiarHTML(){
    // forma lenta
    //contenedorCarrito.innerHTML = ''; 

    // forma optima
    while(contenedorCarrito.firstChild){
       contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}