'use strict';
module.exports = function (sequelize, DataTypes) {
  var usuarios = sequelize.define('usuarios', {
    nombre: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
      unique: true,
    },
    contrasena: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    tipo_usuario: {
      type: DataTypes.ENUM("admin", "usuario"),
      validate: {
        isIn: [
          ['admin', 'usuario']
        ],
        notEmpty: true
      }
    },
    saldo: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        usuarios.hasMany(models.libro_rentas);
      }
    }
  });
  return usuarios;
};