const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripcion de una tarea por hacer'
};

const completado = {
    default: true,
    alias: 'c',
    desc: 'Marca como completado o pendiente la tarea'
};

const filtroListar = {
    alias: 'f',
    desc: 'Filtra listado entre true y false'
}


const argv = require('yargs')
    .command('crear', 'Crea una tarea por hacer', { descripcion })
    .command('actualizar', 'Actualiza el estado de una tarea', {
        //descripcion: descripcion -- es lo mismo
        descripcion,
        completado
    })
    .command('listar', 'Lista todas las tareas', { filtroListar })
    .command('borrar', 'Elimina una tarea de la lista', { descripcion })
    .help()
    //regresamos el argv
    .argv;

//exportamos el argv
module.exports = {
    argv
}