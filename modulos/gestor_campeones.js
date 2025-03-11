const fs = require('fs');
const menu = require('./menu');
//Data
const data = JSON.parse(fs.readFileSync('../campeones.json', 'utf8'));
//Caracteres especiales
const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;    

class Campeones{
    constructor(nombre,rol,poder){
        this.nombre = nombre;
        this.rol = rol;
        this.poder = poder;
    }

    toString(campeon){
        console.log(`Campeon: ${} - Rol: ${} - Poder: ${}`);
    }

}

class Juego{
    agregarCampeon(){
        console.clear();
        agregarCampeonNombre();
        let nombreCampeon, rolCampeon, poderCampeon;

        function agregarCampeonNombre(){
            console.log('=== Nuevo Campeón ===');
            let nombre = prompt ('Introduce el nombre del nuevo campeón: ');
                if (nombre.includes(regex) || nombre === " " || nombre === ""){
                    console.log('Has introucido un nombre inválido!');
                        prompt ('Pulsa enter para volver a intentarlo...');
                        return this.agregarCampeonNombre;
                }
                else{
                    nombreCampeon = nombre;
                    agregarCampeonRol();
                }
        }
        function agregarCampeonRol(){
            let rol = prompt ('Introduce el rol del nuevo campeón [Ej: Pícaro]: ');
            if (rol.includes(regex) || rol === " " || rol === ""){
                console.log('Has introucido un rol inválido!');
                    prompt ('Pulsa enter para volver a intentarlo...');
                    return this.agregarCampeonRol;
            }
            else{
                rolCampeon = rol;
                agregarCampeonPoder();
            }
        }
        function agregarCampeonPoder(){
            let poder = Number(prompt ('Introduce el poder del nuevo campeón [0-100]: '));
            if (poder.includes(regex) || poder < 0 || poder > 100 || isNaN(poder)){
                console.log('Has introducido un poder inválido, asegurate de introducir un valor numérico entre 0 y 100!');
                    prompt ('Pulsa enter para volver a intentarlo...');
                    return this.agregarCampeonPoder;
            }
            else{
                poderCampeon = poder;
                console.log('=== Nuevo Campeón ===');
                console.log(`Nombre: ${nombreCampeon} - Rol: ${rolCampeon} - Poder: ${poderCampeon}`);
                let confirmacion = prompt ('¿Quieres confirmar la creación del heroe? (S/N): ');
                    switch (confirmacion.toLocaleLowerCase){
                        case "s":
                            console.log(`Heroe ${nombreCampeon} creado!`);
                            prompt ('Pulsa enter para volver al menú...');
                                return menu();
                        case "n":
                            console.log(`Creación de heroe cancelada!`);
                            prompt ('Pulsa enter para volver al menú...');
                                return menu();
                        default:
                            console.log('Opción inválida');
                    }
            }
        }
    }
}

//Export functiones
module.exports = {};