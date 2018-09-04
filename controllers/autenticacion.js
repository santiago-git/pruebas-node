var usuariosModel = require('../models').usuarios;
const auth = require("../middlewares/auth");


module.exports = {
    registro(req, res) {
        const usuario = new usuariosModel({
            nombre: req.body.nombre,
            email: req.body.email,
            contrasena: auth.encriptarPass(req.body.contrasena),
            tipo_usuario: req.body.tipo_usuario,
            saldo: req.body.saldo
        })

        // auth.encriptarPass(usuario.dataValues.contrasena, function (err, res) {
        //     if (err)
        //         console.log(err)
        //     if (res){
        //         // console.log(res)                
        //         usuario.dataValues.contrasena=res;
        //     }
        // });

        // auth.desencriptarPass("contrasena", "$2a$10$x77oQ8E6/DvdbL8o3Tmlh.XYvPP9MWD8q1vampGdlkgErEP6JqHS6", function (err, res) {
        //     if (err)
        //         console.log(err)

        //     console.log(res)
        // });

        usuario.save()
            .then(user => {
                // you can now access the currently saved task with the variable anotherTask... nice!
                res.status(200).send({
                    token: auth.crearToken(user.dataValues)
                });
            })
            .catch(error => {
                // Ooops, do some error-handling
                console.log(error);
                res.status(500).send({
                    mensaje: "error al crear",
                    error: error
                });
            })
    },

    login(req, res) {
        usuariosModel.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then(resp => {

                if (!resp)
                    res.status(404).send("Usuario no encontrado")
                else {
                    if (auth.desencriptarPass(req.body.contrasena, resp.dataValues.contrasena)) {
                        res.status(200).send({
                            mensaje: "Se ha logueado correctamente",
                            token: auth.crearToken(resp.dataValues)
                        });
                    } else
                        res.status(404).send("Contraseña incorrecta")
                }



            })
            .catch(error => {
                // Ooops, do some error-handling
                console.log(error);            
                res.status(500).send({
                    mensaje: "error",
                    error: error.errors
                });
            })

    },


    iniciarSesion(req, res) {

    }

};