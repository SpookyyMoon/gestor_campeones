// Filesystem
const fs = require('fs');
// Prompt
const prompt = require('prompt-sync')();
// Data
const data = JSON.parse(fs.readFileSync('./campeones.json', 'utf8'));
// Caracteres especiales
const regex = /[!@#$%^&*()\-+={}[\]:;"'<>,.?\/|\\]/;    

class Campeones{
    constructor(nombre,rol,poder){
        this.nombre = nombre;
        this.rol = rol;
        this.poder = poder;
    }

    static toString(campeon){ // Muestra cada campeon en forma de string legible
        console.log(`Campeon: ${campeon.nombre} - Rol: ${campeon.rol} - Poder: ${campeon.rol}`);
    }

}

class Juego{
    static agregarCampeon(menu){ // Recibe la función menú para poder regresar
        console.clear();
        let nombreCampeon, rolCampeon, poderCampeon;
        agregarCampeonNombre();

        function agregarCampeonNombre(){
            console.log('=== Nuevo Campeón ===');
            let nombre = prompt ('Introduce el nombre del nuevo campeón: ');
                if (regex.test(nombre) || nombre === " " || nombre === ""){
                    console.log('\n');
                    console.log('Has introucido un nombre inválido!');
                    console.log('\n');
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
            if (regex.test(rol) || rol === " " || rol === ""){
                console.log('\n');
                console.log('Has introucido un rol inválido!');
                console.log('\n');
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
            if (regex.test(poder) || poder < 0 || poder > 100 || isNaN(poder)){
                console.log('\n');
                console.log('Has introducido un poder inválido, asegurate de introducir un valor numérico entre 0 y 100!');
                console.log('\n');
                    prompt ('Pulsa enter para volver a intentarlo...');
                    return this.agregarCampeonPoder;
            }
            else{
                poderCampeon = poder;
                agregarCampeonConfirmar();
            }
        }
        function agregarCampeonConfirmar(){
            console.clear();
            console.log('=== Nuevo Campeón ===');
            console.log('\n');
            console.log(`Nombre: ${nombreCampeon} - Rol: ${rolCampeon} - Poder: ${poderCampeon}`);
            console.log('\n');
            let confirmacion = prompt ('¿Quieres confirmar la creación del heroe? (S/N): ');
            switch (confirmacion){
                case "s": case "S":
                    const nuevo_campeon = new Campeones(nombreCampeon,rolCampeon,poderCampeon); // Crea un nuevo campeón con los datos previos
                    data.CAMPEONES.push(nuevo_campeon); // Envia el nuevo objeto(Campeon) al json
                    console.clear();
                    console.log('=== Nuevo Campeón ===');
                    console.log('\n');
                    console.log(`Heroe ${nombreCampeon} creado!`);
                    console.log('\n');
                    prompt ('Pulsa enter para volver al menú...');
                        menu();
                        break;
                case "n": case "S":
                    console.log('\n');
                    console.log(`Creación de heroe cancelada!`);
                    console.log('\n');
                    prompt ('Pulsa enter para volver al menú...');
                        menu();
                        break;
                default:
                    console.log('Opción inválida');
                    break;
            }
        }
    }
    static mostrarCampeones(){
        console.log('=== Mostrar Campeones ===\n');
        data.CAMPEONES.forEach(campeon => { // Itera la lista de campeones
            Campeones.toString(campeon); // Envia cada campeon a toString para mostrarse correctamente
        });
        console.log('\n');
    }
    ordenarCampeonPoder(){
        function copiarCampeones(){

        }
        for(let i = 0; i < data.CAMPEONES.length; i++){
            for(let x = 0; x < data.CAMPEONES.length -1; x++){
                if(data.CAMPEONES[x].poder > data.CAMPEONES[x+1].poder){
                    let guardado_valor = data.CAMPEONES[x+1].poder;
                    data.CAMPEONES[x+1].poder = data.CAMPEONES[x].poder;
                    data.CAMPEONES[x].poder = guardado_valor;
                }
            }
        }
    }
    ordenarCampeonRol(){

    }
}

// Export functiones
module.exports = {Campeones, Juego};