
const Obra = require('../models/Obra')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(req,res)=>{
    const valores = req.body
    console.log(valores)

    if(!valores.nome || !valores.cnpj || !valores.tipoObra){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    if(valores.cnpj.length !== 11){
        return res.status(400).json({message: 'CNPJ inválido'})
    }

    try{
        const cnpjCripto = CryptoJs.AES.encrypt(valores.cnpj, CHAVE_SECRETA).toString()

        await Obra.create({
            nome: valores.nome,
            cnpj: cnpjCripto,
            tipoObra: valores.tipoObra
        })
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}
const listar = async(req,res)=>{
    try{
        const obra = await Obra.findAll()
        let resultado = []

        obra.forEach((el)=>{
            let cnpjDescripto = ''
            try{
                const bytes = CryptoJs.AES.decrypt(el.cnpj, CHAVE_SECRETA)
                cnpjDescripto = bytes.toString(CryptoJs.enc.Utf8)
            }catch(err){
                return res.status(500).json({message: 'Erro ao descriptografar'})
            }
            resultado.push({
                codObra:el.codObra,
                nome: el.nome,
                cnpj: cnpjDescripto,
                tipoObra: el.tipoObra
            })
        })
        return res.status(200).json(resultado)
    }catch(err){
        return res.status(500).json({message: 'Erro ao listar dados'})
    }
}
const consultar = async(req,res)=>{
    const id = req.params.id
    console.log(id)

    try{
        const obra = await Obra.findByPk(id)
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        const bytes = CryptoJs.AES.decrypt(el.cnpj, CHAVE_SECRETA)
        const cnpjDescripto = bytes.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codObra: obra.codObra,
            nome: obra.nome,
            cnpj: cnpjDescripto,
            tipoObra: obra.tipoObra
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao consultar dados'})
    }
}

const consultarCNPJ = async(req,res)=>{
    const cnpj = req.params.id
    console.log(cnpj)

    try{
        const obra = await Obra.findOne({where: {cnpj: cnpj}})
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        const bytes = CryptoJs.AES.decrypt(obra.cnpj, CHAVE_SECRETA)
        const cnpjDescripto = bytes.toString(CryptoJs.enc.Utf8)

        return res.status(200).json({
            codObra: obra.codObra,
            nome: obra.nome,
            cnpj: cnpjDescripto,
            tipoObra: obra.tipoObra
        })
    }catch(err){
        return res.status(500).json({message: 'Erro ao consultar dados'})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)

    try{
        const obra = await Obra.findOne({where: {cnpj: cnpj}})
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        let dadosAtualizados = ''
        if(!valores.cnpj){
            if(valores.cnpj.length !== 11){
                return res.status(404).json({message: 'CNPJ inválido'})
            }
            dadosAtualizados.cnpj = CryptoJs.AES.encrypt(obra.cnpj, CHAVE_SECRETA).toString()
        }

        await Obra.update(dadosAtualizados, {where: {codObra:id}})
        return res.status(200).json({message: 'Dados atualizados com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao atualizar dados'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body
    console.log(id)
    console.log(valores)

    try{
        const obra = await Obra.findOne({where: {cnpj: cnpj}})
        if(!obra){
            return res.status(404).json({message: 'Dados não encontrado'})
        }

        await Obra.destroy(valores, {where: {codObra:id}})
        return res.status(200).json({message: 'Dados exclido com sucesso'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao apagar dados'})
    }
}
module.exports = {cadastrar, listar, consultar, consultarCNPJ, atualizar, apagar}