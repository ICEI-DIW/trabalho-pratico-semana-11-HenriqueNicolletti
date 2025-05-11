// Função para buscar todos os lugares
async function buscarLugares() {
  const resposta = await fetch("http://localhost:3000/lugares");
  return await resposta.json();
}

// Função para buscar um lugar pelo ID
async function buscarLugarPorId(id) {
  const resposta = await fetch(`http://localhost:3000/lugares/${id}`);
  return await resposta.json();
}

// Renderiza o carrossel na index.html
async function renderizarCarrossel() {
  const carouselInner = document.getElementById("carousel-inner");
  if (!carouselInner) return;

  const lugares = await buscarLugares();
  let primeiroItem = true;

  lugares.forEach(lugar => {
    if (lugar.destaque) {
      const div = document.createElement("div");
      div.className = `carousel-item ${primeiroItem ? 'active' : ''}`;
      div.innerHTML = `
        <img src="${lugar.imagem_principal}" class="d-block w-100" alt="${lugar.nome}">
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h5>${lugar.nome}</h5>
          <p>${lugar.descricao}</p>
          <a href="detalhes.html?id=${lugar.id}" class="btn btn-primary mt-2">Ver Mais</a>
        </div>
      `;
      carouselInner.appendChild(div);
      primeiroItem = false;
    }
  });
}

// Renderiza os cards na index.html
async function renderizarCards() {
  const cardsContainer = document.getElementById("cards-container");
  if (!cardsContainer) return;

  const lugares = await buscarLugares();
  cardsContainer.innerHTML = "";

  lugares.forEach(lugar => {
    const card = document.createElement("div");
    card.className = "col-12 col-md-6 col-lg-4";
    card.innerHTML = `
      <div class="card h-100">
        <img src="${lugar.imagem_principal}" class="card-img-top" alt="${lugar.nome}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${lugar.nome}</h5>
          <p class="card-text">${lugar.descricao}</p>
          <a href="detalhes.html?id=${lugar.id}" class="btn btn-primary mt-auto">Ver Mais</a>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

// Renderiza a página de detalhes.html
async function renderizarDetalhes() {
  const detalhesContainer = document.getElementById("detalhes-container");
  if (!detalhesContainer) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));

  try {
    const lugar = await buscarLugarPorId(id);

    detalhesContainer.innerHTML = `
      <section class="mb-5">
        <div class="card">
          <img src="${lugar.imagem_principal}" class="card-img-top" alt="${lugar.nome}">
          <div class="card-body">
            <h2 class="card-title">${lugar.nome}</h2>
            <p class="card-text"><strong>Descrição:</strong> ${lugar.descricao}</p>
            <p class="card-text"><strong>País:</strong> ${lugar.pais}</p>
            <p class="card-text"><strong>Categoria:</strong> ${lugar.categoria}</p>
            <p class="card-text"><strong>Autor:</strong> ${lugar.autor}</p>
            <p class="card-text"><strong>Data:</strong> ${lugar.data}</p>
            <a href="index.html" class="btn btn-secondary mt-3">Voltar</a>
          </div>
        </div>
      </section>

      <section>
        <h3 class="mb-3">Galeria de Fotos</h3>
        <div class="row g-4">
          ${lugar.imagens_complementares.map(img => `
            <div class="col-12 col-md-6 col-lg-4">
              <div class="card">
                <img src="${img.src}" class="card-img-top" alt="${img.descricao}">
                <div class="card-body">
                  <p class="card-text">${img.descricao}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  } catch (erro) {
    detalhesContainer.innerHTML = `<p>Item não encontrado!</p>`;
  }
}

// Chamar funções com base na página
document.addEventListener("DOMContentLoaded", () => {
  renderizarCarrossel();
  renderizarCards();
  renderizarDetalhes();
});
