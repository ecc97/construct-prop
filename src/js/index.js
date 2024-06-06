/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/

//importamos la función que obtiene el fetch de la api rest
import { getProducts } from './api'

// seleccionamos contenedor
const section = document.querySelector('section')

// declaramos la función que se encarga de mostrar el listado de productos
async function productsList() {
    const products = await getProducts() // le asignamos a una variable la llamada de getproducts
    section.innerHTML = '' // vaciamos el contenedor
    products.forEach(product => { // recorremos con foreach cada producto traído del array que retorna get products
        // y mostrará los datos del json pintados en html
        section.innerHTML += ` 
        <div class="card text-light col-2 card-custom text-capitalize">
            <img src="${product.imageUrl}"
                class="card-img h-100 object-fit-cover" alt="example">
                <div class="card-body bg-light text-dark">
                <h5 class="card-title">${product.productName}</h5>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">${product.description}</li>
                  <li class="list-group-item">Tipo: ${product.category}</li>
                  <li class="list-group-item">Cantidad: ${product.amount}</li>
                  <li class="list-group-item">Precio: ${product.price}</li>
                  <li class="list-group-item">Estado: ${product.status}</li>
                </ul>
                <a href="http://www.paypal.com" target="_blank" class="btn btn-primary mt-2">Comprar</a>
            </div>
        </div>
        `
    });
}

productsList() // llamamos la función para su ejecución en el index de la página