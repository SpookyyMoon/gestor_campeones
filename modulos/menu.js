// Imports
const gestor_campeones = require ('./gestor_campeones');
// Prompt
const prompt = require('prompt-sync')();

// Funcion menu
function menu(){
    console.clear();
    // Muestra opciones
    console.log(`

    === Gestor de Campeones ===

        1. Agregar Campeón
        2. Mostrar Campeones
        3. Buscar Campeones

        4. Salir
        
    `);

    let opcion = Number(prompt ("Selecciona una opción: "));
    switch (opcion){
        case 1:
            console.clear();
            gestor_campeones.Juego.agregarCampeon(menu); //Llama a la función estática en el módulo (Pasa la funcion menu al método para romper la dependencia circular)
            break;
        case 2:
            console.clear();
                console.log(`
    === Mostrar Campeones===
                    
        1. Ordenar por poder
        2. Ordenar por rol
        
        3. Atrás
        
            `);
            let opcion_ordenar = Number(prompt ("Selecciona una opión: "));
            switch(opcion_ordenar){
                case 1: 
                    gestor_campeones.Juego.mostrarCampeones(opcion_ordenar); // Llama a la función estática en el módulo
                    break;
                case 2: 
                    gestor_campeones.Juego.mostrarCampeones(opcion_ordenar); // Llama a la función estática en el módulo
                    break;
                default:
                    console.log("Has seleccionado una opción inválida!");
                    console.clear();
                    break;
            }
            prompt ("Pulsa enter para volver...");
                menu();
            break;
        case 3:
            console.clear();
            gestor_campeones.Juego.buscarCampeon(menu); //Llama a la función estática en el módulo (Pasa la funcion menu al método para romper la dependencia circular)
            break;
        case 4:
            console.clear();
            process.exit();
        default:
            console.log("Has seleccionado una opción inválida!");
            console.clear();
            menu(); // Sustituyo bucle por volver a llamar la función.
                break;
    }
}

module.exports = menu;