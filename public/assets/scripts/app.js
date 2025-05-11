const dados = {
    "lugares": [
      {
        "id": 1,
        "nome": "Fernando de Noronha",
        "descricao": "Arquipélago com praias paradisíacas e rica vida marinha.",
        "conteudo": "Fernando de Noronha é um dos destinos mais bonitos do Brasil, conhecido pela preservação ambiental e mergulho.",
        "pais": "Brasil",
        "categoria": "Praia",
        "autor": "Agência Turismo BR",
        "destaque": true,
        "data": "2025-04-28",
        "imagem_principal": "assets/img/noronha.jpg",
        "imagens_complementares": [
          { "id": 1, "src": "assets/img/noronha1.jpg", "descricao": "Baía do Sancho" },
          { "id": 2, "src": "assets/img/noronha2.jpg", "descricao": "Praia do Leão" }
        ]
      },
      {
        "id": 2,
        "nome": "Machu Picchu",
        "descricao": "Antiga cidade Inca localizada nos Andes peruanos.",
        "conteudo": "Machu Picchu é um Patrimônio Mundial da UNESCO.",
        "pais": "Peru",
        "categoria": "Histórico",
        "autor": "Viagens Mundo",
        "destaque": true,
        "data": "2025-04-28",
        "imagem_principal": "assets/img/machu_picchu.jpg",
        "imagens_complementares": [
          { "id": 1, "src": "assets/img/machu1.jpg", "descricao": "Vista panorâmica" }
        ]
      },
      {
        "id": 3,
        "nome": "Torre Eiffel",
        "descricao": "Ícone da arquitetura francesa e ponto turístico mundial.",
        "conteudo": "Localizada em Paris, a Torre Eiffel é um dos monumentos mais visitados do mundo.",
        "pais": "França",
        "categoria": "Cultural",
        "autor": "Explore Paris",
        "destaque": true,
        "data": "2025-04-28",
        "imagem_principal": "assets/img/eiffel.jpg",
        "imagens_complementares": [
          { "id": 1, "src": "assets/img/eiffel1.jpg", "descricao": "Vista noturna" }
        ]
      },
      {
        "id": 4,
        "nome": "Torre de Pisa",
        "descricao": "Famosa torre inclinada, marco arquitetônico da Itália.",
        "conteudo": "A Torre de Pisa, construída entre os séculos XII e XIV, é conhecida pela sua inclinação característica e está localizada na cidade de Pisa, Itália.",
        "pais": "Itália",
        "categoria": "Histórico",
        "autor": "Turismo Itália",
        "destaque": false,
        "data": "2025-04-28",
        "imagem_principal": "assets/img/torreDePisa.jpg",
        "imagens_complementares": [
          { "id": 1, "src": "assets/img/torreDePisa1.jpg", "descricao": "Vista da Praça dos Milagres" },
          { "id": 2, "src": "assets/img/torreDePisa2.jpg", "descricao": "Detalhe arquitetônico" }
        ]
      },
      {
        "id": 5,
        "nome": "Maldivas",
        "descricao": "Arquipélago paradisíaco conhecido por suas águas cristalinas.",
        "conteudo": "As Maldivas são compostas por 26 atóis e mais de 1.000 ilhas, sendo um dos destinos mais procurados para viagens de luxo e lua de mel no mundo.",
        "pais": "Maldivas",
        "categoria": "Praia",
        "autor": "Viagens Exóticas",
        "destaque": false,
        "data": "2025-04-28",
        "imagem_principal": "assets/img/Maldivas.jpg",
        "imagens_complementares": [
          { "id": 1, "src": "assets/img/Maldivas1.jpg", "descricao": "Bangalôs sobre o mar" },
          { "id": 2, "src": "assets/img/Maldivas2.jpg", "descricao": "Praias de areia branca" }
        ]
      }
    ]
  };
  
  // Gerar Carrossel dinamicamente
  const carouselInner = document.getElementById("carousel-inner");
  
  if (carouselInner) {
    let primeiroItem = true;
  
    dados.lugares.forEach(lugar => {
      if (lugar.destaque) {
        const div = document.createElement("div");
        div.className = `carousel-item ${primeiroItem ? 'active' : ''}`;
        div.innerHTML = `
          <img src="${lugar.imagem_principal}" class="d-block w-100" alt="${lugar.nome}">
          <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
            <h5>${lugar.nome}</h5>
            <p>${lugar.descricao}</p>
            <a href="detalhes.html?id=${lugar.id}" class="btn btn-primary mt-2" onclick="event.stopPropagation()">Ver Mais</a>
          </div>
        `;
        carouselInner.appendChild(div);
        primeiroItem = false;
      }
    });
  }
  
    
  
  
  // Montar os Cards dinamicamente (index.html)
  const cardsContainer = document.getElementById("cards-container");
  
  if (cardsContainer) {
    cardsContainer.innerHTML = ""; // Garante que esteja limpo
  
    dados.lugares.forEach(lugar => {
      const card = document.createElement("div");
      card.className = "col-12 col-md-6 col-lg-4"; // Responsivo: 1, 2 ou 3 colunas
  
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
  
  
  
  // Montar página de detalhes dinamicamente (detalhes.html)
  const detalhesContainer = document.getElementById("detalhes-container");
  
  if (detalhesContainer) {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const lugar = dados.lugares.find(l => l.id === id);
  
    if (lugar) {
      detalhesContainer.innerHTML = `
        <section class="mb-5">
          <div class="card">
            <img src="${lugar.imagem_principal}" class="card-img-top" alt="${lugar.nome}">
            <div class="card-body">
              <h2 class="card-title">${lugar.nome}</h2>
              <p class="card-text"><strong>Descrição:</strong> ${lugar.descricao}</p>
              <p class="card-text"><strong>País:</strong> ${lugar.pais}</p>
              <p class="card-text"><strong>Categoria:</strong> ${lugar.category || lugar.categoria}</p>
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
    } else {
      detalhesContainer.innerHTML = `<p>Item não encontrado!</p>`;
    }
  }
  