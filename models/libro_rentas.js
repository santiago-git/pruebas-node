'use strict';
module.exports = function (sequelize, DataTypes) {
  var libro_rentas = sequelize.define('libro_rentas', {
    usuario_id: DataTypes.INTEGER,
    libro_id: DataTypes.INTEGER,
    fecha_inicio: DataTypes.DATE,
    fecha_fin: DataTypes.DATE,
    estado_prestamo: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
        libro_rentas.belongsTo(models.usuarios);
        libro_rentas.belongsTo(models.libros);
      }
    }
  });
  return libro_rentas;
};