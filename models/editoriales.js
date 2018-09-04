'use strict';
module.exports = function (sequelize, DataTypes) {
  var editoriales = sequelize.define('editoriales', {
    descripcion: DataTypes.STRING
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        editoriales.hasMany(models.libros);
      }
    }
  });
  return editoriales;
};