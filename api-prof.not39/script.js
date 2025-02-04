async function imprimirMensagens(params) {
    const resposta = await fetch("https://viacep.com.br/ws/01001000/json/")

    const dados = await resposta.json()
    console.log(dados)
    
}

imprimirMensagens()