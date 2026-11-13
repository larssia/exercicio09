const Movimento = require('../models/Movimento')
const Material = require('../models/Material')


const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.idMaterial || !valores.tipo ||
         !valores.qtde || !valores.data || !valores.hora){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const material = await Material.findByPk(valores.idMaterial)
        if(!material){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        await Movimento.create(valores)
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}
const listar = async(req,res)=>{
    try{
        const material = await Material.findAll({
            order: [['data', 'ASC']],
            include: [
                    {
                        model: Material,
                        as: 'movimentoMaterial',
                        attributes: ['idObra', 'descricao', 'categoria', 'quantidade']
                    }
            ]
        })
        return res.status(200).json(material)
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar dados'})
    }
}

module.exports = {cadastrar, listar}