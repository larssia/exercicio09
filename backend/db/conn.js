const {Sequelize} = require('sequelize')
const db = new Sequelize('db_buildcorp', 'root', 'senai',{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
})

module.exports = db