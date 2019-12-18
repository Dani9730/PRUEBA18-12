const express = require('express');
//declara una variable app que es el producto de la funcion express
const app = express();
const axios = require('axios');



const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;

const argv = require('yargs').options({
    nombre: {
        alias: 'n',
        desc: 'Nombre de la ciudad para obtener el clima',
        demand: true
    }
}).argv;
app.use(express.static(__dirname + '/public'));
// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



//todas las peticiones que entren con / van a ejecutar esta funcion
app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'Daniela'
    });
});

app.get('/about', (req, res) => {

    res.render('about');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${ port }`);
});

app.get('/latitud/:latitud/longitud/:longitud', (req, res) => {
    console.log(req.params.latitud, req.params.longitud);
    res.end('recibido')
});

const getInfo = async(ciudad) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(ciudad);
        const temp = await clima.getClima(coords.lat, coords.lng);
        return `El clima de ${ coords.direccion } es de ${ temp }.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${ ciudad }`;
    }
}

getInfo(argv.nombre)
    .then(console.log)
    .catch(console.log);