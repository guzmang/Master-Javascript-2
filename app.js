'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// cargar archivos rutas
var projects_routes = require('./routes/project');

// middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y activar CORS
// El front-end va a estar haciendo peticiones AJAX al back-end continuamente. De esta manera permitimos
// el acceso cruzado entre dominios y se evitarian fallos al momento a la hora de trabajar en el fe con
// la parte del be.
// Este middleware siempre se ejecutara antes de cada peticion.
// De esta manera permitimos el acceso de un dominio a otro.
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');	// el asterisco indica los dominios/origenes permitidos
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();	// configuradas las cabeceras ejecuta lo sig. (ruta y accion correspondiente)
});

// rutas
app.use('/api', projects_routes);	// cargo la ruta en un middleware, sobreescribo rutas anteponiendo un /api

/*
app.get('/', (req, res) => {
	res.status(200).send(
		"<h1>Página de inicio</h1>"
	);
});

// ej: http://localhost:3700/test/88?web=victorroblesweb.es
app.post('/test/:id', (req, res) => {
	console.log(req.body.nombre);
	console.log(req.query.web);
	console.log(req.params.id);

	res.status(200).send({
		message: "Hola mundo desde mi API de NodeJS"
	});
});
*/

// exportar
module.exports = app;