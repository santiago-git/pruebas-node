var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

const clavesecreta = "claveSecreta"; //token
const saltRounds = 10; //encriptar

module.exports = {
    crearToken(user) {
        var token = jwt.sign(user, clavesecreta, {
            expiresIn: "10 year"
        });
        return token;
    },

    isAuth(req, res, next) {
        var token = req.body.token || req.headers["token"];
        if (token) {
            jwt.verify(token, clavesecreta, function (err, decode) {
                if (!err) {
                    next()
                } else {
                    res.status(500).send("Token invalido")
                }
            });
        } else {
            res.status(403).send("Necesitas un token")
        }
    },

    encriptarPass(contrasena, callback) {
        // bcrypt.hash(contrasena, saltRounds, function (err, hash) {
        //     // Store hash in your password DB.
        //     if (err) {
        //         return callback(err);
        //     }
        //     return callback(null, hash);
        // });

        return bcrypt.hashSync(contrasena, saltRounds);
    },

    desencriptarPass(contrasena, contrasenaEncriptada, callback) {
        // bcrypt.compare(contrasena, contrasenaEncriptada, function (err, res) {
        //     if (err) {
        //         return callback(err);
        //     }
        //     return callback(null, res);
        // });

        return bcrypt.compareSync(contrasena, contrasenaEncriptada);

    },
};