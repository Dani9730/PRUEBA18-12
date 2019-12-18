const express = require('express');
//declara una variable app que es el producto de la funcion express
const app = express();
const axios = require('axios');

const hbs = require('hbs');
require('./hbs/helpers');

const port = process.env.PORT || 3000;


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
})