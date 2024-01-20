// Variables del proyecto

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];

ejecutarEventListeners();
function ejecutarEventListeners() {

    //Evento que agrega un producto al presionar "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);

    //Evento que elimina producto del carrito
    carrito.addEventListener('click', eliminarProducto);

    vaciarCarritoBtn.addEventListener('click', () => {
       
        articulosCarrito = [];

        limpiarCarrito();
    })
}

// Funciones

function agregarProducto(e) {

    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProductos(productoSeleccionado);
    }

}

//Funcion que elimina un curso del carrito
function eliminarProducto(e) {
   if(e.target.classList.contains('borrar-curso')){
    const productoId = e.target.getAttribute('data-id');

    //Eliminamos productos del arreglo articulosCarrito por medio del data-id
    articulosCarrito = articulosCarrito.filter( producto => producto.id !== productoId);

    mostrarCarrito(); //Iteramos sobre carrito y mostramos su HTML
   };
}
//Funcion para leer el contenido del HTML y extraer 
//la informacion del producto

function leerDatosProductos(producto) {

    //Creamos un objeto con el contenido del producto
    const infoProducto = {
        imagen: producto.querySelector('img').src,
        nombre: producto.querySelector('h2').textContent,
        precio: producto.querySelector('.precio').textContent.substring(0, 3),
        id: producto.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisamos si un elemento ya existe en el carrito
    //para no agregarlo dos veces
    const existe = articulosCarrito.some(producto => producto.id === infoProducto.id);
    console.log(existe);

    if (existe) {
        //Actualizamos la cantidad

        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                producto.cantidad++;
                return producto; //Retornamos el objeto actualizado
            }else{
                return producto; //Retoronamos los objetos que no son actualizados
            }
        });
        articulosCarrito = [...productos];
    } else {
        //Agregamos productos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, infoProducto];
    }

    console.log(articulosCarrito);

    mostrarCarrito();
}


//Funcion que muestra el arreglo de carrito en el HTML
function mostrarCarrito() {

    //Limpiamos el HTML
    limpiarCarrito();

    //Recorremos el array de productos y generamos el HTML
    articulosCarrito.forEach(producto => {
        let row = document.createElement('tr');

        const { imagen, nombre, precio, cantidad, id } = producto;
        row.innerHTML = `
        <td>
            <img src="${imagen}" >
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;


        //Agregamos el HTML del carrito en el elemento tbody
        contenedorCarrito.appendChild(row)
    });
}

//Eliminamos los productos del tbody para que no se
//repitan en cada iteracion
function limpiarCarrito() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}