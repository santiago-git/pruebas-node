var librosModel = require('../models').libros;
var categoriasModel = require('../models').categorias;
var editorialesModel = require('../models').editoriales;

module.exports = {

    listarTodos(req, res) {
        librosModel.findAll({
                include: {
                    all: true
                }
            })
            .then(function (libros) {
                res.json(libros)
            }).catch(function (err) {
                console.log(err)
                res.status(500).send({
                    error: err,
                    mensaje: "Ha ocurrido un error!",
                });
            });
    },

    listarId(req, res) {
        librosModel.findById(req.params.id, {
                include: {
                    all: true
                }
            })
            .then(resp => {
                if (resp != null) {
                    res.json(resp)
                } else {
                    res.status(404).send("No exite este libro")
                }
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(err)
            });
    },

    crear(req, res) {
        const libro = new librosModel({
            nombre: req.body.nombre,
            categoria_id: req.body.categoria_id,
            editorial_id: req.body.editorial_id,
            precio_mes: req.body.precio_mes
        })

        libro.save()
            .then(libro => {
                res.status(200).send({
                    mensaje: "Libro creado exitosamente!",
                });
            })
            .catch(error => {
                res.status(500).send({
                    mensaje: "error al crear",
                    error: error
                });
            })
    },

    //pruebas
    getData(req, res) {
        var data=[
            {id: 1, Nombre: "Santi", usPropietario: "Santi", fecha:"2015", lugar:"Bogota", descripcion: "descripcion"},
            {nom_usuario: "Victooooor", contrasena: "Hola Mundo"}
        ]
        res.json(data)
    },

    postData(req, res) {
        res.json("Hola mundo Mkones");
    },

};