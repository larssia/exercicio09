const {DataTypes} = require('sequelize')
const db = require('../db/conn')

const Material = db.define('Material',{
    codMaterial :{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    idObra: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'obras',
            key: 'codObra'
        }
    },
    descricao: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    codLote: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    timestamps: false,
    tableName: 'materiais'
})

module.exports = Material