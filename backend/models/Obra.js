const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Obra = db.define('Obra',{
    codObra :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    tipoObra: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'obras'
})

module.exports = Obra