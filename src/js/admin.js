/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/
// Import our custom CSS
import '../scss/styles.scss'
// Importamos las funciones que contiene sus métodos para crear leer actualizar eliminar producto
import { createProduct, updateProduct, findId, getProducts, deleteProduct } from "./api";
// obtenemos el usuario logueado con la llave del localstorage
let adminUser = JSON.parse(localStorage.getItem('adminOnline'))

//Mostramos nombre de usuario logueado
const showAdminName = document.querySelector('#info-admin')
showAdminName.textContent = `${adminUser.userName}`

// traer contenedor
const tbody = document.querySelector('tbody')

//traer formulario y sus campos
const form = document.querySelector('#product-form')
const nameProduct = document.querySelector('#name')
const image = document.querySelector('#image')
const productType = document.querySelector('#category')
const priceByUnit = document.querySelector('#price')
const amount = document.querySelector('#amount')
const description = document.querySelector('#description')
const status = document.querySelector('#status')

// declaramos un id para buscar y obtener producto
let id

//evento del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    // creamos un objeto temporal que se inyectará en el json
    const product = {
        productName: nameProduct.value,
        imageUrl: image.value,
        category: productType.value,
        price: priceByUnit.value,
        amount: amount.value,
        description: description.value,
        status: status.value,
        adminId: adminUser.id
    }

    console.log(product)

    if (id === undefined){ // si no hay id existente
        await createProduct(product) // ponte a crear un producto
        alert('Producto agregado con éxito')
    } else {
        await updateProduct(id, product) // de lo contrario puedes actualizarlo
        alert('Producto actualizado')
    }

    await readProducts() // al hacer una acción dependiendo de la condicional se reinicia la lectura de los datos llamando la función que lee el listado
    form.reset() // reseteamos el formulario

})

// evento en el contenedor
tbody.addEventListener('click', async (e) => {
    if(e.target.classList.contains('edit-btn')){ // si se da click a un elemento con la clase editar
        id = e.target.dataset.id // obtenemos el id del producto
        const foundProductId = await findId(id) // llamamos la función buscadora por el id
        // en cada campo se pinta los datos a actualizar
        nameProduct.value =  foundProductId.productName
        image.value = foundProductId.imageUrl
        productType.value = foundProductId.category
        priceByUnit.value = foundProductId.price
        amount.value = foundProductId.amount
        description.value = foundProductId.description
        status.value = foundProductId.status
    } else if(e.target.classList.contains('delete-btn')) { // si no si se da click a un elemento con la clase eliminar
        const id = e.target.dataset.id // obtenemos el id
        if(confirm('Deseas eliminar este producto?')){ // si confirmamos su eliminación
            await deleteProduct(id) // se ejecuta la función eliminar y se elimina del json
            await readProducts() // reiniciamos lectura
            location.reload() // recargamos la página
        }
    }
})

// declaramos la función que se encarga de mostrar el listado de productos
async function readProducts(){
    const products = await getProducts()
    // vamos a filtar los productos de cada admin logueado en el dashboard comparando un id relacional con el id del adminUser
    const productByAdmin = products.filter(product => product.adminId === adminUser.id)
    tbody.innerHTML = ''
    productByAdmin.forEach(product => {
        tbody.innerHTML += `
        <tr>
          <td>${product.productName}</td>
          <td>
            <img src="${product.imageUrl}" alt="${product.productName}" class="productImage">
          </td>
          <td>${product.price}</td>
          <td>${product.amount}</td>
          <td>${product.price * product.amount}</td>
          <td>
            <button type="button" data-id=${product.id} class="btn btn-warning edit-btn">Modificar</button>
            <button type="button" data-id=${product.id} class="btn btn-danger delete-btn">Eliminar</button>
          </td>
        </tr>
        `
    });
}

readProducts()



