/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/
const URL_API_USERS = `http://localhost:3000/adminUsers` // url endpoint de adminUsers

// obtenemos el form y sus campos
const form = document.getElementById('register-form')
const fullName = document.getElementById('full-name')
const username = document.getElementById('username')
const email = document.getElementById('email')
const password = document.getElementById('password')
const confirmPassword = document.getElementById('confirm-password')

//evento en el form
form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const checkEmail = await validateEmail(email)
    const checkPassword = validatePasswords(password, confirmPassword)

    const newUser = {
        fullName: fullName.value,
        userName: username.value,
        email: email.value,
        password: password.value
    }
    console.log(newUser)

    // si el email no existe registramos admin
    if(checkEmail === true){
        if(checkPassword === true){ // verificar contraseñas que sean iguales
            registerAdmin(newUser)
            alert(`Bienvenido ${username.value}, tu cuenta ha sido creada`)
            window.location.href = 'login.html'
        } else {
            alert('Las contraseñas no coinciden')
        }
    } else {
        alert('Ya existe este correo')
    }
})

// validar email
async function validateEmail(email){
    const response = await fetch(`${URL_API_USERS}?email=${email.value}`) // buscamos en el endpoint el valor del email ingresado y verificamos si existe 
    const data = await response.json()

    // si la longitud data del array es igual a 0
    if(data.length === 0){
        return true // retornamos true
   } else {
        return false // retornamos falso
   }
}

// validar campos contraseñas que sean igual
function validatePasswords(password, confirmPassword) {
    if(password.value === confirmPassword.value){
        return true
    } else {
        return false
    }
}

// función para registrar usuarios admin
async function registerAdmin(newUser){
    const response = await fetch(URL_API_USERS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    });

    const adminRegistered = await response.json()
    console.log(adminRegistered)
    return adminRegistered
}