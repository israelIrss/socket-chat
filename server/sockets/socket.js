const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const usuarios = new Usuarios();
const { crearMensaje } = require('../utilidades/utilidades');

io.on('connection', (client) => {

    client.on('entrarChat', (data, callback) => {
        if (!data.nombre || !data.sala) {
            return callback({
                err: true,
                mensaje: 'El nombre es necesario'
            });
        }
        client.join(data.sala); //ayuda a unirnos a una sala
        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        client.broadcast.to(data.sala).emit('listaPersona', usuarios.getPersonasPorSala(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unio`));

        callback(usuarios.getPersonasPorSala(data.sala));
    });
    client.on('crearMensaje', (data, callback) => {
        let persona = usuarios.getPersona(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);

        callback(mensaje);
    });
    client.on('disconnect', () => {
        let personaBorrada = usuarios.borrarPersona(client.id); //borra a usuarios que se desconectaron
        client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} salio`));
        client.broadcast.to(personaBorrada.sala).emit('listaPersona', usuarios.getPersonasPorSala(personaBorrada.sala));
    });
    //Mensajes Privados
    client.on('mensajePrivado', data => {
        let persona = usuarios.getPersona(client.id);
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));

    });
});

//este se usa en la consola del chat para revisar si sirve
//socket.emit('crearMensaje',{nombre:'israel',mensaje:'todos me la pelan'});