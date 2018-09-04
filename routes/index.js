const UsuarioController = require('../controllers').usuarios;
const LibroController = require('../controllers').libros;
const AutenticacionController = require('../controllers').autenticacion;

const auth = require("../middlewares/auth");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mi api Renta de libros' });
});

// get     select
// post    create
// put     update
// delete  delete

router.post('/registro', AutenticacionController.registro);
router.post('/login', AutenticacionController.login);

//Rutas para pruebas
router.get('/reunion', LibroController.getData);
router.post('/pruebapost', LibroController.postData);

router.get('/usuario', UsuarioController.listarTodos);
router.get('/usuario/:id', UsuarioController.listarId);
router.put('/usuario/:id', UsuarioController.actualizar);
router.delete('/usuario/:id', UsuarioController.eliminar);

router.get('/libro', auth.isAuth, LibroController.listarTodos);
router.get('/libro/:id', auth.isAuth, LibroController.listarId);
router.post('/crear', auth.isAuth, LibroController.crear);

module.exports = router;
