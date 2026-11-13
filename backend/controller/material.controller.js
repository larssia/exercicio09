const Obra = require('../models/Obra')
const Material = require('../models/Material')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.idObra || !valores.descricao || !valores.categoria || !valores.quantidade || !valores.codLote){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const obra = await Obra.findByPk(valores.idObra)
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrados'})
        }

        const codLoteCripto = CryptoJs.AES.encrypt(valores.codLote, CHAVE_SECRETA).toString()

        await Material.create({
            idObra: valores.idObra,
            descricao: valores.descricao,
            categoria: valores.categoria,
            quantidade: valores.quantidade,
            codLote: codLoteCripto
        })
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)

    try{
        const material = await Material.findByPk(id)
        if(!material){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        const obra = await Obra.findByPk(valores.idObra)
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        let dadosAtualizados = ''
        if(!valores.codLote){
            dadosAtualizados.codLote = CryptoJs.AES.encrypt(material.codLote, CHAVE_SECRETA).toString()
        }

        await Material.update(dadosAtualizados, {where: {codMaterial:id}})
        return res.status(200).json({message: 'Dados atualizados com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados'})
    }
}

module.exports = {cadastrar,atualizar}