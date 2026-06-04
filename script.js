// Estado global da aplicação
let carrinho = [];
let valorTotal = 0;
let statusAtual = 1;

// 1. Função para adicionar itens ao carrinho de compras
function adicionarAoCarrinho(nomeProduto, idSelect) {
    const selectComponent = document.getElementById(idSelect);
    const preco = parseFloat(selectComponent.value);
    const tamanhoText = selectComponent.options[selectComponent.selectedIndex].text.split(' - ')[0];

    const item = {
        nome: `${nomeProduto} (${tamanhoText})`,
        preco: preco
    };

    carrinho.push(item);
    atualizarInterfaceCarrinho();
}

// 2. Função para adicionar bebidas rápidas
function adicionarBebida(nomeBebida, preco) {
    carrinho.push({ nome: nomeBebida, preco: preco });
    atualizarInterfaceCarrinho();
}

// 3. Atualiza o painel do carrinho e o total a pagar
function atualizarInterfaceCarrinho() {
    const listaHtml = document.getElementById('itens-carrinho');
    const vazioMsg = document.getElementById('carrinho-vazio');
    const totalExibido = document.getElementById('valor-total-exibido');
    const payTotal = document.getElementById('pay-total');

    if (carrinho.length === 0) {
        vazioMsg.style.display = "block";
        valorTotal = 0;
    } else {
        vazioMsg.style.display = "none";
        
        // Limpa itens antigos mantendo apenas o elemento padrão invisível
        listaHtml.innerHTML = '<li style="display:none;" id="carrinho-vazio"></li>';
        
        valorTotal = 0;
        carrinho.forEach(item => {
            valorTotal += item.preco;
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.nome}</span> <strong>R$ ${item.preco.toFixed(2)}</strong>`;
            listaHtml.appendChild(li);
        });
    }

    totalExibido.innerText = `R$ ${valorTotal.toFixed(2)}`;
    payTotal.innerText = `R$ ${valorTotal.toFixed(2)}`;
}

// 4. Interação com o Mapa de Mesas
function selecionarMesaNode(numeroMesa, elemento) {
    // Desmarca a mesa anteriormente selecionada
    const nodes = document.querySelectorAll('.table-node');
    nodes.forEach(node => node.classList.remove('selected'));

    // Marca a nova mesa
    elemento.classList.add('selected');
    document.getElementById('res-mesa').value = `Mesa 0${numeroMesa}`;
}

// 5. Envio de Reserva
function realizarReserva(event) {
    event.preventDefault();
    const nome = document.getElementById('res-nome').value;
    const mesa = document.getElementById('res-mesa').value;
    alert(`Sucesso, ${nome}! Sua solicitação para a ${mesa} foi enviada ao sistema.`);
}

// 6. Envio do Pedido do Carrinho
function enviarPedidoParaProducao() {
    if (carrinho.length === 0) {
        alert("Seu painel de compras está vazio! Escolha algum item do cardápio.");
        return;
    }
    const cliente = document.getElementById('ped-cliente').value;
    const tipo = document.getElementById('ped-tipo').value;
    
    // Altera metadados do painel de monitoramento abaixo
    document.getElementById('track-num').innerText = `#${Math.floor(1000 + Math.random() * 9000)}`;
    document.getElementById('track-end').innerText = tipo === "Presencial" ? "Mesa do Salão" : "Endereço Delivery";
    document.getElementById('track-tempo').innerText = "35-45 min";
    
    alert(`Pedido enviado para a cozinha com sucesso!\nCliente: ${cliente}`);
}

// 7. Seleção Visual das formas de pagamento
function selecionarFormaPagamento(metodo, idElemento) {
    const botoes = document.querySelectorAll('.pay-btn');
    botoes.forEach(btn => btn.classList.remove('selected'));

    document.getElementById(idElemento).classList.add('selected');
    document.getElementById('pay-method').innerText = metodo;
    
    const statusBox = document.getElementById('pay-status');
    statusBox.innerText = "Aprovado / Confirmado";
    statusBox.style.color = "var(--verde-principal)";
}

// 8. Simulador de Avanço do Status da esteira de entregas
function simularAvancoStatus() {
    statusAtual++;
    if(statusAtual > 5) statusAtual = 1;

    // Reseta classes visuais de progresso
    for(let i = 1; i <= 5; i++) {
        document.getElementById(`st-${i}`).classList.remove('active');
    }

    // Ativa até o passo atual
    for(let i = 1; i <= statusAtual; i++) {
        document.getElementById(`st-${i}`).classList.add('active');
    }
}