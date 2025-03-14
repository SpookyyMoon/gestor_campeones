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
        console.log(`Campeon: ${campeon.nombre} - Rol: ${campeon.rol} - Poder: ${campeon.poder}`);
    }

}

class Juego{

    // Comprueba expresiones regulares en inputs
    static regexCheckCampeones(entrada){
        if (regex.test(entrada) || entrada === " " || entrada === ""){
            return true;
        }
        else{
            return false;
        }
    }

    static agregarCampeon(menu){ // Recibe la función menú para poder regresar
        console.clear();
        let nombreCampeon, rolCampeon, poderCampeon;
        agregarCampeonNombre();

        // Agregar nombre campeón
        function agregarCampeonNombre(){
            console.clear();
            console.log('=== Nuevo Campeón ===');
            console.log('\n');
            let nombre = prompt ('Introduce el nombre del nuevo campeón: ');
                if (Juego.regexCheckCampeones(nombre)){
                    console.log('\n');
                    console.log('Has introucido un nombre inválido!');
                    console.log('\n');
                        prompt ('Pulsa enter para volver a intentarlo...');
                        return agregarCampeonNombre();
                }
                else{
                    nombreCampeon = nombre;
                    agregarCampeonRol();
                }
        }
        // Agregar rol campeón
        function agregarCampeonRol(){
            console.clear();
            console.log('=== Nuevo Campeón ===');
            console.log('\n');
            let rol = prompt ('Introduce el rol del nuevo campeón [Ej: Pícaro]: ');
            if (Juego.regexCheckCampeones(rol)){
                console.log('\n');
                console.log('Has introucido un rol inválido!');
                console.log('\n');
                    prompt ('Pulsa enter para volver a intentarlo...');
                    return agregarCampeonRol();
            }
            else{
                rolCampeon = rol;
                agregarCampeonPoder();
            }
        }
        // Agregar poder campeón
        function agregarCampeonPoder(){
            console.clear();
            console.log('=== Nuevo Campeón ===');
            console.log('\n');
            let poder = Number(prompt ('Introduce el poder del nuevo campeón [0-100]: '));
            if (isNaN(poder) || poder < 0){
                console.log('\n');
                console.log('Has introducido un poder inválido, asegurate de introducir un valor numérico entre 0 y 100!');
                console.log('\n');
                    prompt ('Pulsa enter para volver a intentarlo...');
                    return agregarCampeonPoder();
            }
            else{
                poderCampeon = poder;
                agregarCampeonConfirmar();
            }
        }
        // Confirmar nuevo campeón
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
    // Método mostrar campeones
    static mostrarCampeones(orden){
        console.log('=== Mostrar Campeones ===\n');
        switch(orden){
            case 1: // Bubble sort campeones por poder
                ordenarCampeonPoder();
            break;
            case 2: // Bubble sort campeones por rol
                ordenarCampeonRol();
            break;
        }

        function ordenarCampeonPoder(){
            let campeonesCopia = data.CAMPEONES;

            for(let i = 0; i < campeonesCopia.length; i++){
                for(let x = 0; x < campeonesCopia.length -1; x++){
                    if(campeonesCopia[x].poder < campeonesCopia[x+1].poder){
                        let guardado_valor = campeonesCopia[x+1];
                        campeonesCopia[x+1] = campeonesCopia[x];
                        campeonesCopia[x] = guardado_valor;
                    }
                }
            }
            mostrar(campeonesCopia);
        }

        function ordenarCampeonRol(){
            let campeonesCopia = data.CAMPEONES;

            for(let i = 0; i < campeonesCopia.length; i++){
                for(let x = 0; x < campeonesCopia.length -1; x++){
                    if(campeonesCopia[x].rol[0] > campeonesCopia[x+1].rol[0]){
                        let guardado_valor = campeonesCopia[x+1];
                        campeonesCopia[x+1] = campeonesCopia[x];
                        campeonesCopia[x] = guardado_valor;
                    }
                }
            }
            mostrar(campeonesCopia);
        }

        // Muestra los campeones en el orden correspondiente
        function mostrar(listado){
            listado.forEach(campeon => { // Itera la lista de campeones
                Campeones.toString(campeon); // Envia cada campeon a toString para mostrarse correctamente
            });
            console.log('\n');
        }
    }
    // Método buscar campeón
    static buscarCampeon(menu){
        let campeonesCopia;
        console.clear();
        console.log('=== Buscar Campeón ===');
        console.log('\n');
        let campeon_buscar = prompt ('Introduce el nombre del campeón: ');
        if (this.regexCheckCampeones(campeon_buscar) || campeon_buscar == " " || campeon_buscar == ""){
            console.log('\n');
            console.log('Has introucido un nombre inválido!');
            console.log('\n');
                prompt ('Pulsa enter para volver a intentarlo...');
                return this.buscarCampeon();
        }
        else{
            ordenarCampeonNombre();
            let encontrado = false;
            let izquierda = 0;
            let derecha = campeonesCopia.length - 1;
            let intentos = 0;
            
            while(izquierda <= derecha && !encontrado){
                let division = Math.floor((izquierda + derecha) / 2); //Evitar decimales en el resultado de la division
                intentos++;

                if (campeonesCopia[division].nombre == campeon_buscar){
                    encontrado = true;
                    console.clear();
                    console.log('=== Buscar Campeón ===');
                    console.log('\n');
                    Campeones.toString(campeonesCopia[division]);
                }
                else if (campeonesCopia[division].nombre[0] > campeon_buscar[0]){
                    derecha = division - 1; // Buscar en la mitad izquierda
                }
                else {
                    izquierda = division + 1; // Buscar en la mitad derecha
                }
            }
            if(encontrado){
                console.log('\n');
                prompt ('Pulsa enter para volver al menú...');
                    menu();
            }
        }
        // Ordena campeones por nombre 
        function ordenarCampeonNombre(){
            campeonesCopia = data.CAMPEONES;

            for(let i = 0; i < campeonesCopia.length; i++){
                for(let x = 0; x < campeonesCopia.length -1; x++){
                    if(campeonesCopia[x].nombre[0] > campeonesCopia[x+1].nombre[0]){
                        let guardado_valor = campeonesCopia[x+1];
                        campeonesCopia[x+1] = campeonesCopia[x];
                        campeonesCopia[x] = guardado_valor;
                    }
                }
            }
        }
    }
}

// Export functiones
module.exports = {Campeones, Juego};