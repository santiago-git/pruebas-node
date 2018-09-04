'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('libros', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'categorias',
            key: 'id'
          }
      },
      editorial_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'editoriales',
            key: 'id'
          }
      },
      precio_mes: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('libros');
  }
};