//Configuracion de la logica
//Files ystem
const fs = require('fs');
const colors = require('colors');
//inicializo como arreglo vacio
let listadoPorHacer = [];


const guardarDB = () => {

    //strungify convierte un objeto en un JSON
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile(`db/data.json`, data, (err) => {

        if (err) {
            throw new Error('No se pudo grabar.', err);
        }

    });

}

const cargarDB = () => {
    //leer archivo json, peticion HTTP
    //o un require desde el archivo ya que estamos del lado del servidor
    //automaticamente los erializa y lo convierte en obj de js
    try {
        listadoPorHacer = require('../db/data.json');

    } catch (error) {
        listadoPorHacer = [];
    }



}

const crear = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;

}

const getListado = (filtroListar = true) => {

    if (filtroListar == "true") {
        filtroListar = true;
    } else if (filtroListar == "false") {
        filtroListar = false;
    } else {
        filtroListar = undefined;
    }

    cargarDB();

    if (filtroListar !== undefined) {
        let nuevoListado = listadoPorHacer.filter(tarea => tarea.completado === filtroListar)

        listadoPorHacer = nuevoListado;
    }

    return listadoPorHacer;

}

//true por defecto
const actualizar = (descripcion, completado = true) => {
    //cargo el arreglo al listadoPorHacer
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
        // {return tarea.descripcion === descripcion} ES LO MISMO

    if (index >= 0) {
        if (completado == "true") {
            completado = true;
        } else {
            completado = false;
        }
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}


const borrar = (descripcion) => {

    cargarDB();

    //let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion)
    //tambien puede ser
    //filter: funcion de los arreglos que permite quitar o filtrar un elemento, regresa nuevo arreglo
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)

    // if (index >= 0) {
    //     console.log(index);
    //     listadoPorHacer.splice(index, 1);
    //     guardarDB();
    //     return true;
    // } else {
    //     return false;
    // }

    if (listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        //la bd guarda listadoPorHacer, por eso se le asigna nuevoListado
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }



}


module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}