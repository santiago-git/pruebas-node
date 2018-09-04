'use strict';

module.exports = function (sequelize, DataTypes) {
  var libros = sequelize.define('libros', {
    nombre: DataTypes.STRING,
    categoria_id: DataTypes.INTEGER,
    editorial_id: DataTypes.INTEGER,
    precio_mes: DataTypes.FLOAT
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });

  libros.associate = (models) => {
    libros.belongsTo(models.categorias, {
      foreignKey: 'categoria_id',
      as: 'categoria'
    });
    
    libros.belongsTo(models.editoriales, {
      foreignKey: 'editorial_id',
      as: 'editorial'
    })

  };



  return libros;
};