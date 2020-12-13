class Usuarios {
    constructor() {
        this.personas = [];
    }
    agregarPersona(id, nombre, sala) {
        let persona = {
            id, //se agrega persona y se le asigna un id
            nombre,
            sala
        };
        this.personas.push(persona);
        return this.personas;
    }
    getPersona(id) { // busca en el arreglo de personas si alguien tiene el id
        let persona = this.personas.filter(persona => {
            return persona.id === id
        })[0]; //se pone 0 por que la funcion filtrer regresa un areglo y solo necesitamos el primer dato
        return persona;
    }
    getPersonas() { //regresa todas las personas que estan en el chat
        return this.personas;
    }
    getPersonasPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => {
            persona.sala === sala
        })
        return personasEnSala;
    }
    borrarPersona(id) {
        let personaBorrada = this.getPersona(id);
        this.personas = this.personas.filter(persona => {
            return persona.id != id // vuelve a guardar todos los datos a exepcion del que queremos eliminiar
        });
        return personaBorrada; //regresa la persona que se borro 
    }

}
module.exports = {
    Usuarios
}