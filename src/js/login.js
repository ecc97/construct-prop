/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/
//obtenemos el formulario y sus campos
const form = document.querySelector('#login-form')
const username = document.querySelector('#username')
const password = document.querySelector('#password')

const URL_API_USERS = `http://localhost:3000/adminUsers` // url endpoint de adminsUsers
// evento del formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const response = await fetch(`${URL_API_USERS}?userName=${username.value}`)
    const data = await response.json()

    if(data.length > 0) { // si la longitud del array data es mayor que 0
        const user = data[0] // pon a data en la posición 0
        if(user.password === password.value) { // verificar la contraseña
            alert(`Bienvenido ${user.userName}`)
            localStorage.setItem('adminOnline', JSON.stringify(user)) // guardamos el adminUser en el localstorage para su sesión
            window.location.href = 'dashboard.html'
        } else {
            alert('Contraseña incorrecta')
        }
    } else {
       alert('Los datos ingresados son incorrectos. Intenta de nuevo')
    }
})