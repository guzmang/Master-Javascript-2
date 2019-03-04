'use strict'

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();
// Este middleware se ejecuta antes que el metodo del controlador
// Uso el middleware del modulo connect-multiparty instalado (para usar uploadImage)
// debo ejecutar el metodo e indicarle en que carpeta voy a guardar las img o files
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);		// el '?' indica que id es opcional
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);	// id obligatorio
router.delete('/project/:id', ProjectController.deleteProject);
router.get('/get-image/:image', ProjectController.getImage);

// Para utilizar el middleware lo tengo que aplicar a una ruta, para que se ejecute
// antes que el propio metodo.
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;