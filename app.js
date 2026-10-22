// projetos de exemplo
const projetos = [
  {
    codigo: "PC-001",
    nome: "Eixo escalonado",
    descricao: "Conjunto de transmissão",
    revisao: "A",
    paginas: 2,
    tipo: "eixo",
  },
  {
    codigo: "PC-002",
    nome: "Bucha espaçadora",
    descricao: "Conjunto de apoio",
    revisao: "A",
    paginas: 1,
    tipo: "bucha",
  },
  {
    codigo: "PC-003",
    nome: "Flange de fixação",
    descricao: "Conjunto de montagem",
    revisao: "A",
    paginas: 2,
    tipo: "flange",
  },
];

// elementos da lista
const listaProjetos = document.getElementById("lista-projetos");
const campoBusca = document.getElementById("busca");
const quantidade = document.getElementById("quantidade");

// informações do projeto
const codigoProjeto = document.getElementById("codigo-projeto");
const nomeProjeto = document.getElementById("nome-projeto");
const descricaoProjeto = document.getElementById("descricao-projeto");
const revisaoProjeto = document.getElementById("revisao-projeto");

// visualizador
const painel = document.getElementById("painel");
const areaVisualizacao = document.getElementById("area-visualizacao");
const quadroImagem = document.getElementById("quadro-imagem");
const imagemProjeto = document.getElementById("imagem-projeto");
const pdfProjeto = document.getElementById("pdf-projeto");
const linkPDF = document.getElementById("abrir-pdf-externo");

// campo de arquivo
const campoArquivo = document.getElementById("arquivo");

// controles de zoom
const botaoDiminuir = document.getElementById("diminuir");
const botaoAumentar = document.getElementById("aumentar");
const botaoAjustar = document.getElementById("ajustar");
const valorZoom = document.getElementById("valor-zoom");

// controles de página
const botaoAnterior = document.getElementById("pagina-anterior");
const botaoProxima = document.getElementById("proxima-pagina");
const numeroPagina = document.getElementById("numero-pagina");

// mensagens e tela cheia
const botaoTelaCheia = document.getElementById("tela-cheia");
const mensagem = document.getElementById("mensagem");
const dica = document.getElementById("dica");

// estado do visualizador
let projetoAtual = projetos[0];
let paginaAtual = 1;
let zoomAtual = 100;

let arquivoLocalUrl = null;
let arquivoPDF = false;

// mostra a lista de projetos
function mostrarLista() {
  const busca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

  const encontrados = projetos.filter(function (projeto) {
    const texto = projeto.nome + " " + projeto.codigo;

    return texto.toLocaleLowerCase("pt-BR").includes(busca);
  });

  listaProjetos.replaceChildren();
  quantidade.textContent = encontrados.length;

  if (encontrados.length === 0) {
    const aviso = document.createElement("p");

    aviso.className = "lista-vazia";
    aviso.textContent = "Nenhum projeto encontrado.";

    listaProjetos.appendChild(aviso);
    return;
  }

  encontrados.forEach(function (projeto) {
    const botao = document.createElement("button");
    const codigo = document.createElement("small");
    const nome = document.createElement("strong");
    const detalhes = document.createElement("span");

    botao.type = "button";
    botao.className = "item-projeto";

    const selecionado = projetoAtual === projeto;

    botao.classList.toggle("ativo", selecionado);
    botao.setAttribute("aria-pressed", String(selecionado));

    codigo.textContent = projeto.codigo;
    nome.textContent = projeto.nome;

    detalhes.textContent =
      projeto.paginas + " folha(s) · Rev. " + projeto.revisao;

    botao.append(codigo, nome, detalhes);

    botao.addEventListener("click", function () {
      selecionarProjeto(projeto);
    });

    listaProjetos.appendChild(botao);
  });
}

// cria os desenhos de exemplo
function criarDesenho() {
  let desenho = "";

  if (paginaAtual === 2) {
    desenho = `
      <circle cx="450" cy="255" r="110" />
      <circle cx="450" cy="255" r="55" />

      <circle
        cx="450"
        cy="255"
        r="82"
        stroke-dasharray="8 5"
      />
    `;
  } else if (projetoAtual.tipo === "eixo") {
    desenho = `
      <path
        d="
          M 180 215
          H 300 V 180
          H 570 V 215
          H 700 V 295
          H 570 V 330
          H 300 V 295
          H 180 Z
        "
      />

      <path d="M 300 180 V 330" />
      <path d="M 570 180 V 330" />
    `;
  } else if (projetoAtual.tipo === "bucha") {
    desenho = `
      <rect x="230" y="180" width="440" height="150" />

      <path
        d="M 230 225 H 670 M 230 285 H 670"
        stroke-dasharray="9 5"
      />
    `;
  } else {
    desenho = `
      <path
        d="
          M 220 205
          H 540 V 160
          H 620 V 350
          H 540 V 305
          H 220 Z
        "
      />

      <path d="M 540 160 V 350" />

      <path
        d="M 220 235 H 620 M 220 275 H 620"
        stroke-dasharray="9 5"
      />
    `;
  }

  const vista = paginaAtual === 1 ? "VISTA PRINCIPAL" : "VISTA FRONTAL";

  return `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="900"
      height="580"
      viewBox="0 0 900 580"
    >
      <rect width="900" height="580" fill="white" />

      <rect
        x="25"
        y="25"
        width="850"
        height="530"
        fill="none"
        stroke="#9ca3af"
      />

      <g font-family="Arial, sans-serif" fill="#374151">
        <text
          x="55"
          y="65"
          font-size="12"
          letter-spacing="2"
        >
          ${projetoAtual.codigo} / ${vista}
        </text>

        <text
          x="845"
          y="65"
          text-anchor="end"
          font-size="10"
          fill="#6b7280"
        >
          DESENHO ILUSTRATIVO
        </text>

        <g
          fill="none"
          stroke="#374151"
          stroke-width="2.5"
        >
          ${desenho}
        </g>

        <path
          d="M 130 255 H 760"
          stroke="#9ca3af"
          stroke-dasharray="15 5 3 5"
        />

        <text
          x="450"
          y="410"
          text-anchor="middle"
          font-size="12"
          fill="#6b7280"
        >
          Ilustração sem escala e sem cotas de fabricação
        </text>

        <path
          d="M 25 455 H 875 M 680 455 V 555"
          fill="none"
          stroke="#9ca3af"
        />

        <text x="48" y="480" font-size="10" fill="#6b7280">
          PROJETO DA PEÇA
        </text>

        <text x="48" y="510" font-size="24">
          ${projetoAtual.nome}
        </text>

        <text x="48" y="537" font-size="11" fill="#6b7280">
          ConecTorno · projeto escolar SENAI
        </text>

        <text x="700" y="485" font-size="11">
          REVISÃO ${projetoAtual.revisao}
        </text>

        <text x="700" y="515" font-size="13">
          Folha ${paginaAtual} de ${projetoAtual.paginas}
        </text>

        <text x="700" y="537" font-size="10" fill="#6b7280">
          NÃO USAR PARA FABRICAÇÃO
        </text>
      </g>
    </svg>
  `;
}

// atualiza a página exibida
function atualizarPagina() {
  if (arquivoLocalUrl === null) {
    const desenho = criarDesenho();

    imagemProjeto.src =
      "data:image/svg+xml;charset=utf-8," + encodeURIComponent(desenho);
  }

  if (arquivoPDF) {
    numeroPagina.textContent = "Páginas no PDF";
  } else {
    numeroPagina.textContent =
      "Folha " + paginaAtual + " de " + projetoAtual.paginas;
  }

  botaoAnterior.disabled = arquivoPDF || paginaAtual <= 1;

  botaoProxima.disabled = arquivoPDF || paginaAtual >= projetoAtual.paginas;
}

// altera o zoom das imagens
function alterarZoom(valor) {
  zoomAtual = Math.max(50, Math.min(250, valor));

  quadroImagem.style.width = zoomAtual + "%";

  valorZoom.textContent = arquivoPDF ? "PDF" : zoomAtual + "%";

  botaoDiminuir.disabled = arquivoPDF || zoomAtual === 50;

  botaoAumentar.disabled = arquivoPDF || zoomAtual === 250;
}

// libera o arquivo local anterior
function limparArquivoLocal() {
  pdfProjeto.removeAttribute("src");

  linkPDF.hidden = true;
  linkPDF.removeAttribute("href");

  if (arquivoLocalUrl !== null) {
    URL.revokeObjectURL(arquivoLocalUrl);
    arquivoLocalUrl = null;
  }
}

// abre um projeto de exemplo
function selecionarProjeto(projeto) {
  limparArquivoLocal();

  projetoAtual = projeto;
  paginaAtual = 1;
  arquivoPDF = false;

  codigoProjeto.textContent = projeto.codigo + " / DESENHO ILUSTRATIVO";

  nomeProjeto.textContent = projeto.nome;

  descricaoProjeto.textContent = projeto.descricao + " · projeto de exemplo";

  revisaoProjeto.textContent = "REVISÃO " + projeto.revisao;

  quadroImagem.hidden = false;
  pdfProjeto.hidden = true;

  imagemProjeto.alt = "Ilustração de " + projeto.nome;

  mensagem.textContent = "Desenho de exemplo · não utilizar para fabricação.";

  dica.textContent =
    "Use o zoom para consultar os detalhes e as barras de rolagem para percorrer a imagem.";

  alterarZoom(100);
  atualizarPagina();
  mostrarLista();

  areaVisualizacao.scrollTo(0, 0);
}

// identifica o formato do arquivo
function identificarFormato(arquivo) {
  const tiposAceitos = [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "image/webp",
  ];

  if (tiposAceitos.includes(arquivo.type)) {
    return arquivo.type;
  }

  // alguns navegadores não informam o tipo do arquivo
  const extensao = arquivo.name.split(".").pop().toLowerCase();

  const formatos = {
    pdf: "application/pdf",
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    webp: "image/webp",
  };

  return formatos[extensao] || null;
}

// abre um arquivo selecionado no computador
function abrirArquivoLocal(arquivo) {
  const formato = identificarFormato(arquivo);

  if (!formato) {
    mensagem.textContent = "Formato não aceito. Escolha PDF, PNG, JPG ou WebP.";

    return;
  }

  if (arquivo.size === 0) {
    mensagem.textContent = "O arquivo está vazio. Escolha outro arquivo.";

    return;
  }

  // define o tipo quando o navegador não o informou corretamente
  const arquivoParaAbrir =
    arquivo.type === formato ? arquivo : new Blob([arquivo], { type: formato });

  const novaUrl = URL.createObjectURL(arquivoParaAbrir);

  limparArquivoLocal();

  arquivoLocalUrl = novaUrl;
  arquivoPDF = formato === "application/pdf";

  projetoAtual = {
    nome: arquivo.name,
    paginas: 1,
  };

  paginaAtual = 1;

  codigoProjeto.textContent = "ARQUIVO LOCAL";
  nomeProjeto.textContent = arquivo.name;

  descricaoProjeto.textContent = "Aberto apenas neste navegador";

  revisaoProjeto.textContent = "LOCAL";

  quadroImagem.hidden = arquivoPDF;
  pdfProjeto.hidden = !arquivoPDF;

  if (arquivoPDF) {
    pdfProjeto.src = arquivoLocalUrl + "#view=FitH";

    linkPDF.href = arquivoLocalUrl;
    linkPDF.hidden = false;

    mensagem.textContent =
      "PDF selecionado · não enviado nem salvo no sistema.";

    dica.textContent =
      "Use os controles do próprio PDF para ampliar e trocar páginas. Se ele não aparecer, tente abrir em outra aba.";
  } else {
    imagemProjeto.src = arquivoLocalUrl;
    imagemProjeto.alt = arquivo.name;

    mensagem.textContent = "Carregando imagem...";

    dica.textContent =
      "Use o zoom e as barras de rolagem para consultar a imagem.";
  }

  alterarZoom(100);
  atualizarPagina();
  mostrarLista();

  areaVisualizacao.scrollTo(0, 0);
}

// busca de projetos
campoBusca.addEventListener("input", mostrarLista);

// recebe o arquivo escolhido pelo seletor
campoArquivo.addEventListener("change", function () {
  const arquivo = campoArquivo.files[0];

  if (!arquivo) {
    return;
  }

  try {
    abrirArquivoLocal(arquivo);
  } catch (erro) {
    console.error("Erro ao abrir arquivo:", erro);

    mensagem.textContent =
      "Não foi possível abrir o arquivo. Tente selecioná-lo novamente.";
  } finally {
    // permite selecionar novamente o mesmo arquivo
    campoArquivo.value = "";
  }
});

// controles de zoom
botaoDiminuir.addEventListener("click", function () {
  alterarZoom(zoomAtual - 25);
});

botaoAumentar.addEventListener("click", function () {
  alterarZoom(zoomAtual + 25);
});

botaoAjustar.addEventListener("click", function () {
  alterarZoom(100);
  areaVisualizacao.scrollTo(0, 0);

  if (arquivoPDF) {
    pdfProjeto.src = arquivoLocalUrl + "#view=FitH";
  }
});

// controles de página
botaoAnterior.addEventListener("click", function () {
  if (!arquivoPDF && paginaAtual > 1) {
    paginaAtual--;
    atualizarPagina();
  }
});

botaoProxima.addEventListener("click", function () {
  if (!arquivoPDF && paginaAtual < projetoAtual.paginas) {
    paginaAtual++;
    atualizarPagina();
  }
});

// tela cheia
botaoTelaCheia.addEventListener("click", async function () {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await painel.requestFullscreen();
    }
  } catch (erro) {
    mensagem.textContent =
      "Não foi possível ativar a tela cheia neste navegador.";
  }
});

document.addEventListener("fullscreenchange", function () {
  botaoTelaCheia.textContent = document.fullscreenElement
    ? "Sair da tela cheia"
    : "Tela cheia";
});

// confirma o carregamento de uma imagem local
imagemProjeto.addEventListener("load", function () {
  if (arquivoLocalUrl !== null && !arquivoPDF) {
    mensagem.textContent =
      "Imagem carregada · não enviada nem salva no sistema.";
  }
});

// informa erro ao carregar uma imagem
imagemProjeto.addEventListener("error", function () {
  mensagem.textContent =
    "Não foi possível carregar esta imagem. Confira se o arquivo é válido.";
});

// inicia com o primeiro projeto de exemplo
selecionarProjeto(projetos[0]);
// armazenamento dos projetos no navegador
(function () {
  let banco = null;
  let arquivoAtual = null;
  let projetosSalvos = [];
  let salvando = false;

  // cria o botão de salvar
  const botaoSalvar = document.createElement("button");

  botaoSalvar.type = "button";
  botaoSalvar.className = "botao-salvar";
  botaoSalvar.textContent = "Salvar projeto";
  botaoSalvar.disabled = true;

  document.querySelector(".informacoes-projeto").after(botaoSalvar);

  botaoSalvar.style.marginBottom = "16px";

  // cria a seção dos projetos salvos
  const secaoSalvos = document.createElement("section");

  const tituloSalvos = document.createElement("p");
  tituloSalvos.className = "legenda lista-legenda";
  tituloSalvos.textContent = "PROJETOS SALVOS";

  const listaSalvos = document.createElement("div");
  listaSalvos.className = "lista-salvos";

  secaoSalvos.append(tituloSalvos, listaSalvos);
  listaProjetos.after(secaoSalvos);

  // mostra mensagens na lista
  function mostrarAviso(texto) {
    listaSalvos.replaceChildren();

    const aviso = document.createElement("p");

    aviso.className = "aviso-salvos";
    aviso.textContent = texto;

    listaSalvos.appendChild(aviso);
  }

  // atualiza o botão de salvar
  function atualizarBotaoSalvar() {
    botaoSalvar.disabled = banco === null || arquivoAtual === null || salvando;

    botaoSalvar.textContent = salvando ? "Salvando..." : "Salvar projeto";
  }

  // monta a lista dos arquivos guardados
  function mostrarProjetosSalvos() {
    const busca = campoBusca.value.trim().toLocaleLowerCase("pt-BR");

    const encontrados = projetosSalvos.filter(function (projeto) {
      return projeto.nome.toLocaleLowerCase("pt-BR").includes(busca);
    });

    listaSalvos.replaceChildren();

    if (encontrados.length === 0) {
      mostrarAviso(
        projetosSalvos.length === 0
          ? "Nenhum projeto salvo ainda."
          : "Nenhum projeto salvo corresponde à busca.",
      );

      return;
    }

    encontrados.forEach(function (projeto) {
      const botao = document.createElement("button");
      const nome = document.createElement("strong");
      const detalhes = document.createElement("span");

      botao.type = "button";
      botao.className = "item-projeto";

      nome.textContent = projeto.nome;

      detalhes.textContent =
        projeto.formato === "application/pdf"
          ? "PDF · salvo neste navegador"
          : "Imagem · salva neste navegador";

      botao.append(nome, detalhes);

      botao.addEventListener("click", function () {
        try {
          // transforma o conteúdo salvo em um arquivo
          const arquivo = new File([projeto.conteudo], projeto.nome, {
            type: projeto.formato,
          });

          abrirArquivoLocal(arquivo);

          arquivoAtual = null;
          atualizarBotaoSalvar();

          listaSalvos
            .querySelectorAll(".item-projeto")
            .forEach(function (item) {
              item.classList.remove("ativo");
              item.setAttribute("aria-pressed", "false");
            });

          botao.classList.add("ativo");
          botao.setAttribute("aria-pressed", "true");

          mensagem.textContent =
            "Projeto aberto do armazenamento deste navegador.";
        } catch (erro) {
          console.error(erro);

          mensagem.textContent = "Não foi possível abrir o projeto salvo.";
        }
      });

      listaSalvos.appendChild(botao);
    });
  }

  // busca os arquivos no banco do navegador
  function carregarProjetosSalvos() {
    const transacao = banco.transaction("projetos", "readonly");
    const tabela = transacao.objectStore("projetos");
    const pedido = tabela.getAll();

    pedido.onsuccess = function () {
      projetosSalvos = pedido.result;

      projetosSalvos.sort(function (a, b) {
        return a.nome.localeCompare(b.nome, "pt-BR");
      });

      mostrarProjetosSalvos();
    };

    pedido.onerror = function () {
      mostrarAviso("Não foi possível carregar os projetos salvos.");
    };
  }

  // observa a seleção antes que o outro evento limpe o input
  campoArquivo.addEventListener(
    "change",
    function () {
      const arquivo = campoArquivo.files[0];

      if (!arquivo) {
        return;
      }

      const formato = identificarFormato(arquivo);

      if (formato && arquivo.size > 0) {
        arquivoAtual = arquivo;
      } else {
        arquivoAtual = null;
      }

      listaSalvos.querySelectorAll(".item-projeto").forEach(function (item) {
        item.classList.remove("ativo");
        item.setAttribute("aria-pressed", "false");
      });

      atualizarBotaoSalvar();
    },
    true,
  );

  // exemplos não precisam ser salvos
  listaProjetos.addEventListener("click", function (evento) {
    if (evento.target.closest(".item-projeto")) {
      arquivoAtual = null;
      atualizarBotaoSalvar();

      listaSalvos.querySelectorAll(".item-projeto").forEach(function (item) {
        item.classList.remove("ativo");
        item.setAttribute("aria-pressed", "false");
      });
    }
  });

  // pesquisa também entre os arquivos salvos
  campoBusca.addEventListener("input", function () {
    if (banco) {
      mostrarProjetosSalvos();
    }
  });

  // salva o arquivo completo, não apenas o seu endereço temporário
  botaoSalvar.addEventListener("click", function () {
    if (!banco || !arquivoAtual || salvando) {
      return;
    }

    const arquivoParaSalvar = arquivoAtual;
    const formato = identificarFormato(arquivoParaSalvar);

    const repetido = projetosSalvos.some(function (projeto) {
      return projeto.nome === arquivoParaSalvar.name;
    });

    if (repetido) {
      mensagem.textContent =
        "Já existe um projeto com esse nome. Renomeie o arquivo antes de salvar outra versão.";

      return;
    }

    try {
      salvando = true;
      atualizarBotaoSalvar();

      const transacao = banco.transaction("projetos", "readwrite");

      const tabela = transacao.objectStore("projetos");

      tabela.add({
        nome: arquivoParaSalvar.name,
        formato: formato,
        conteudo: arquivoParaSalvar,
        salvoEm: Date.now(),
      });

      // só confirma depois que a gravação terminar
      transacao.oncomplete = function () {
        salvando = false;

        if (arquivoAtual === arquivoParaSalvar) {
          arquivoAtual = null;
        }

        atualizarBotaoSalvar();
        carregarProjetosSalvos();

        mensagem.textContent =
          'Projeto "' + arquivoParaSalvar.name + '" salvo neste navegador.';
      };

      transacao.onabort = function () {
        salvando = false;
        atualizarBotaoSalvar();

        mensagem.textContent =
          "Não foi possível salvar. O armazenamento pode estar cheio ou indisponível.";
      };
    } catch (erro) {
      salvando = false;
      atualizarBotaoSalvar();

      console.error(erro);

      mensagem.textContent =
        "Não foi possível acessar o armazenamento do navegador.";
    }
  });

  // abre ou cria o banco local
  mostrarAviso("Carregando projetos salvos...");

  try {
    const pedidoBanco = indexedDB.open("conectorno", 1);

    pedidoBanco.onupgradeneeded = function (evento) {
      const novoBanco = evento.target.result;

      if (!novoBanco.objectStoreNames.contains("projetos")) {
        novoBanco.createObjectStore("projetos", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };

    pedidoBanco.onsuccess = function () {
      banco = pedidoBanco.result;

      atualizarBotaoSalvar();
      carregarProjetosSalvos();
    };

    pedidoBanco.onerror = function () {
      mostrarAviso("O navegador não permitiu acessar os projetos salvos.");

      mensagem.textContent =
        "Você ainda pode abrir arquivos, mas o salvamento está indisponível.";
    };
  } catch (erro) {
    mostrarAviso("O armazenamento está indisponível neste navegador.");
  }
})();
