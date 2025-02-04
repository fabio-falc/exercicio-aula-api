import { pegarDadosReadme, pegarDadosRepositorios, pegarDadosUsuario } from "./exercicio.js"

function renderUserData({ name, avatar_url, github_url }) {
  const header = document.querySelector("header")
  const profileInfo = header.querySelector("div")

  profileInfo.querySelector("h1").textContent = `Este é o perfil de ${name}`
  profileInfo.querySelector("img").src = avatar_url

  header.querySelector("a").href = github_url
}

function renderGithubReadme(data) {
  document.getElementById("README").innerHTML = marked.parse(data)
}

function renderGithubRepos(repos) {
  const projectsElement = document.getElementById("projects")
  projectsElement.innerHTML = ''

  repos.forEach((repo) => {
    const projectContainer = document.createElement("div")
    projectContainer.classList.add("project")

    const title = document.createElement("h2")
    const titleAnchor = document.createElement("a")
    titleAnchor.textContent = repo.full_name
    titleAnchor.href = repo.html_url
    titleAnchor.target = "_blank"

    title.appendChild(titleAnchor)

    projectContainer.appendChild(title)

    if (repo.description) {
      const description = document.createElement("p")
      description.textContent = repo.description
      projectContainer.appendChild(description)
    }

    projectsElement.appendChild(projectContainer)
  })
}

async function renderProfile(user_name) {
  document.querySelector('header').classList.add("hidden")
  document.querySelector('main').classList.add("hidden")
  
  const mensagemElemento = document.getElementById("message")
  mensagemElemento.textContent = "Carregando..."
  mensagemElemento.classList.remove("danger")
  mensagemElemento.classList.remove("hidden")


  try {
    const { avatar: avatar_url, nome: name, perfil: github_url } = await pegarDadosUsuario(user_name)
    const githubReadme = await pegarDadosReadme(name)
    const repos = await pegarDadosRepositorios(name)
  
    renderUserData({ avatar_url, github_url, name })
    renderGithubReadme(githubReadme)
    renderGithubRepos(repos)

    mensagemElemento.innerHTML = ''
    mensagemElemento.classList.add("hidden")
  } catch (err) {
    mensagemElemento.classList.remove("Hidden")
    mensagemElemento.classList.add("danger")
    mensagemElemento.textContent = "Houve um erro ao carregar o perfil completo."
  }

  document.querySelector('header').classList.remove("hidden")
  document.querySelector('main').classList.remove("hidden")

}

const searchProfileButton = document.getElementById("botao-procurar-perfil")
const nameInput = document.getElementById("campo-nome")

searchProfileButton.addEventListener("click", () => {
  const name = nameInput.value

  renderProfile(name)
})
