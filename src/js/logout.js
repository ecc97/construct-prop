/*
Nombre Completo: Edwin Carmona Cifuentes
Clan: Dell
fecha: 04-06-2024
*/
const btnLogout = document.querySelector('#btn-logout')
const admin = localStorage.getItem('adminOnline') // obtener el usuario logueado

//evento para el botón 
btnLogout.addEventListener('click', () => {
    localStorage.removeItem('adminOnline') // eliminamos el item del usuario logueado
    window.location.href = '/' // nos dirigimos a index
})

// si no hay admin logueado te redirije a login
if(!admin) {
    window.location.href = 'login.html' 
}