const {Funcionario, Obra, Material, Movimento} = require('./models/rel')
const conn = require('./db/conn')

async function syncDataBase() {
    try{
        await conn.sync({force: true})
        console.log('Sincronizando as Tabelas')
    }catch(err){
        console.error('Erro ao Sincronizaro as Tabelas', err)
    }finally{
        await conn.close()
        console.log('Tabelas Sincronizandas ')
    }
}

syncDataBase()