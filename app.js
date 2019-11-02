//importacion de yargs y colors


//const argv = require('yargs').argv;

const argv = require('./config/yargs').argv;


const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    //validaciones de comandos
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        break;

    case 'listar':
        let listado = porHacer.getListado(argv.filtroListar);

        for (let tarea of listado) {
            console.log('======== POR HACER ========='.green);
            console.log(tarea.descripcion);
            if (tarea.completado) {
                console.log('Estado: OK');
            } else {
                console.log('Estado:Pendiente');
            }
            console.log('=============================');
        }

        break;

    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;

    case "borrar":
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;

    default:
        console.log('Comando desconocido');
}