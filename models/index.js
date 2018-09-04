'use strict';

var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "production"; //development, test, production
// var config    = require(__dirname + '/..\config\config.json')[env];
var config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var db = {};

var pg = require('pg');

if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config); //conexion a la bd
  // sequelize.query("SELECT * FROM usuarios", { type:Sequelize.QueryTypes.SELECT}).then(function(usuarios) {
  //     console.log(usuarios)
  // });

  // sequelize.authenticate().then(() => {
  //   console.log('Se ha establecido la conexión correctamente a ' + env);
  // }).catch(err => {
  //   console.error('Error en la conexión a la base de datos ' + env, err);
  // });
}

// var pool = new pg.Pool({
//   database: config.database,
//   user: config.username,
//   password: config.password,
//   port: config.port,
//   ssl: config.dialectOptions.ssl,
//   host: config.host,
// })

// pool.connect((err, client, release) => {
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT * from usuarios;', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })
// pool.end();


var db = {};

fs.readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function (modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;