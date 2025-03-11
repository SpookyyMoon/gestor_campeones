//Imports
const inventario = require ('./gestor_campeones');
//Prompt
const prompt = require('prompt-sync')();

//Funcion menu
function menu(){
    
    //Muestra opciones
    console.log(`

    === Gestor de Campeones ===

        1. Agregar Campeón
        2. Mostrar Campeones
        3. Buscar Campeones

        4. Salir
        
`)

let opcion = Number(prompt ("Selecciona una opción: "));
switch (opcion){
    case 1:
        console.clear();

        break;
    case 2:
        console.clear();

        prompt ("Pulsa enter para volver...");
            console.clear();
            menu();
        break;
    case 3:
        console.clear();
        
        break;
    case 4:
        console.clear();
        
        break;
    case 5:
        console.clear();
        
        break;
    case 6:
        console.clear();
        
        prompt ("Pulsa enter para volver...");
            console.clear();
            menu();
        break;
    case 7:
        console.clear();
        process.exit();
    default:
        console.log("Has seleccionado una opción inválida!");
        console.clear();
        menu(); //Sustituyo bucle por volver a llamar la función.
            break;
    }
}

module.exports = menu;