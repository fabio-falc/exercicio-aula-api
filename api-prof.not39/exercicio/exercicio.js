// Recebe o nome inserido no input como argumento
// Deve retornar um objeto com nome, avatar e url do perfil
export async function pegarDadosUsuario(nome) {
    const resposta = await fetch ('https://api.github.com/users/${nome}')

    const dados = await resposta.json()
    
  return {
    nome: dados.login,
    avatar: dados.avatar_url,
    perfil: dados.html_url,
  }
}

// Recebe o nome inserido no input como argumento
// Deve retornar um array com os repositórios retornados da api
export async function pegarDadosRepositorios(nome) {
    const resposta = await fetch (`https://api.github.com/users/${nome}/repos`)
    const respositorios = await resposta.json()


  return respositorios
}

// Recebe o nome inserido no input como argumento
// Deve retornar um texto com o README retornado da api
export async function pegarDadosReadme(nome) {
    const resposta = await fetch (`https://raw.githubusercontent.com/${nome}/${nome}/main/README.md`)
    const Readme = await resposta.text()

    return Readme
}

