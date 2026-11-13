const Funcionario = require('../models/Funcionario')

const CryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'nuvem'

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.email || !valores.senha){
        return res.status(400).json({message: 'Todos os campos são obrigatórios'})
    }

    try{
        const senhaDescripto = CryptoJs.AES.encrypt(valores.senha, CHAVE_SECRETA).toString()

        await Funcionario.create({
            nome: valores.nome,
            email: valores.email,
            senha: senhaDescripto
        })
        return res.status(201).json({message: 'Dados cadastrados com sucesso!'})
    }catch(err){
        return res.status(500).json({message: 'Erro ao cadastrar dados'})
    }
}

module.exports = {cadastrar}