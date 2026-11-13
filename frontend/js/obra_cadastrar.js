let token = localStorage('token')

let resposta = document.getElementById('resposta')
let btn_cadastrar = document.getElementById('btn_cadastrar')

btn_cadastrar.addEventListener('click', (e)=>{
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        cnpj: document.getElementById('cnpj').value,
        tipoObra: document.getElementById('tipoObra').value
    }

    fetch(`http://localhost:3000/obra`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ''
        resposta.innerHTML += `<p>${dados.message}</p>`
        document.querySelector('form').reset()
    })
    .catch((err)=>{
        console.error('Erro ao cadastrar')
        resposta.innerHTML = `<p>Erro ao conectar com o banco</p>`
    })
})