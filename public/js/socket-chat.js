var socket = io();
var params = new URLSearchParams(window.location.search); //busca dentro del url
if (!params.has('nombre') || !params.has('sala')) {
    window.location = 'index.html'; //cambia de pagina al usuario
    throw new Error('el nombre y sala  son necesario');
}
var usuario = {
    nombre: params.get('nombre'),
    sala: params.get('sala')
};
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', usuario, function(resp) {
        console.log('Usuarios Conectados:', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
// socket.emit('crearMensaje', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Escuchar información
socket.on('crearMensaje', function(mensaje) {

    console.log('Servidor:', mensaje);

});
//escuchar cuando un usuario entra o sale del chat
socket.on('listaPersona', function(personas) {

    console.log(personas);

});
//Mensajes privados
socket.on('mensajePrivado', function(mensaje) {
    console.log('mensaje privado ', mensaje);
});