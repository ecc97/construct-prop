/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/
const URL_API_PRODUCTS = `http://localhost:3000/products` // obtenemos la url del endpoint de productos

// función para obtener los productos
export async function getProducts() {
    const response = await fetch(URL_API_PRODUCTS)
    const data = await response.json()
    return data
}

// función para crear productos 
export async function createProduct(product){
    const response = await fetch(URL_API_PRODUCTS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    const data = await response.json()
    console.log(data)
    return data
}

// función para actualizar productos
export async function updateProduct(id, product){
    const response = await fetch(`${URL_API_PRODUCTS}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    const data = await response.json()
    console.log(data)

    id = undefined
}

// función para buscar por su id el producto para hacer la acción de editar
export async function findId(id) {
    const response = await fetch(`${URL_API_PRODUCTS}/${id}`)
    const data = await response.json()
    return data
} 

//función para eliminar
export async function deleteProduct(id) {
    const response = await fetch(`${URL_API_PRODUCTS}/${id}`, {
        method: 'DELETE'
    })
    const data = response.json()
    return data
}