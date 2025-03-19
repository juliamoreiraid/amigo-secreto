let amigos = [];
let resultadosSorteio = [];

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") return;

    if (amigos.includes(nome)) {
        alert("Esse nome já foi adicionado.");
        return;
    }

    amigos.push(nome);
    input.value = "";
    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    amigos.forEach((amigo, index) => {
        let item = document.createElement("li");
        item.textContent = `${index + 1}. ${amigo}`;
        lista.appendChild(item);
    });

    const qtdAmigos = document.getElementById("qtdAmigos");
    qtdAmigos.textContent = `Número de amigos: ${amigos.length}`;
}

function sortearAmigo() {
    if (amigos.length < 3) {
        alert("Adicione pelo menos três amigos para sortear.");
        return;
    }

    let sorteio = [...amigos];
    let tentativas = 0;
    let sucesso = false;

    while (!sucesso && tentativas < 100) {
        for (let i = sorteio.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [sorteio[i], sorteio[j]] = [sorteio[j], sorteio[i]];
        }

        sucesso = true;
        for (let i = 0; i < amigos.length; i++) {
            if (amigos[i] === sorteio[i]) {
                sucesso = false;
                break;
            }
        }
        tentativas++;
    }

    if (!sucesso) {
        alert("O sorteio falhou. Tente novamente.");
        return;
    }

    resultadosSorteio = [];
    for (let i = 0; i < sorteio.length; i++) {
        resultadosSorteio.push({ amigo1: amigos[i], amigo2: sorteio[i] });
    }

    exibirResultados();
}

function exibirResultados() {
    let resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    resultadosSorteio.forEach(({ amigo1, amigo2 }) => {
        let item = document.createElement("li");
        item.textContent = `${amigo1} → ${amigo2}`;
        resultado.appendChild(item);
    });

    document.getElementById("botaoRevelar").style.display = "none";
}

function reiniciarSorteio() {
    amigos = [];
    resultadosSorteio = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("qtdAmigos").textContent = "Número de amigos: 0";
    document.getElementById("botaoRevelar").style.display = "none";
}
