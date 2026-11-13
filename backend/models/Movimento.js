const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Movimento = db.define('Movimento',{
    codMovimento :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idMaterial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'materiais',
            key: 'codMaterial'
        }
    },
    tipo: {
        type: DataTypes.ENUM('SAIDA', 'ENTRADA'),
        allowNull: false
    },
    qtde: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'movimentos'
})

module.exports = Movimento