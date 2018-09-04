'use strict';
module.exports = function (sequelize, DataTypes) {
  var categorias = sequelize.define('categorias', {
    descripcion: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return categorias;
};