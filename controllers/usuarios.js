var usuariosModel = require('../models').usuarios;

module.exports = {
    listarTodos(req, res) {
        usuariosModel.findAll({
                attributes: ["id", 'nombre', 'email', 'contrasena', 'tipo_usuario', 'saldo', "createdAt", "updatedAt"]
            })
            .then(function (users) {
                res.status(200).send(users)
            }).catch(function (err) {
                console.log(err)
                res.status(500).send(err)
            });
    },

    listarId(req, res) {
        usuariosModel.findById(req.params.id).then(user => {
            res.status(200).json(user)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err)
        });
    },

    eliminar(req, res) {
        usuariosModel.destroy({
            where: {
                id: req.params.id
            }
        }).then(user => {
            res.json(user)
        }).catch(function (err) {
            console.log(err)
            res.status(500).send(err.name)
        });
    },

    actualizar(req, res) {
        usuariosModel.update({
                nombre: req.body.nombre,
                tel: req.body.tel,
                username: req.body.username,
                password: req.body.password
            }, {
                where: {
                    id: req.params.id
                }
            })
            .then(resp => res.json(resp))
            .catch(function (err) {
                console.log(err)
                res.status(500).send(err.name)
            });
    },
};