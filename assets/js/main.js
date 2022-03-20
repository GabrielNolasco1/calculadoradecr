const inputCargaHoraria = document.querySelector('.input-credito-disciplina');
const inputNota = document.querySelector('.input-nota');
const tableBody = document.querySelector('.table-body');
const tcdResult = document.querySelector('.tcd-result');
const cdnResult = document.querySelector('.cdn-result');
const crResult = document.querySelector('.cr-result')

function resultadoProduto () {
    const trList = tableBody.querySelectorAll('.linha');
    for (let valor of trList) {
        let inputNota = valor.querySelector('.input-nota')
        let inputCreditoDisciplina = valor.querySelector('.input-credito-disciplina')
        let colunaResultado = valor.querySelector('.celula-resultado-produto')
        resultado = inputNota.value * inputCreditoDisciplina.value;
        colunaResultado.innerHTML = resultado
    }
}

function totalCreditoDisciplinaVezesNota () {
    const colunaResultadoList = tableBody.querySelectorAll('.linha .celula-resultado-produto');
    let totalCreditoVezesNota = 0;
    for (valor of colunaResultadoList) {
        let valorNumber = Number(valor.innerHTML)
        totalCreditoVezesNota += valorNumber;
        cdnResult.innerHTML = totalCreditoVezesNota;
    }  
    return totalCreditoVezesNota;
}

function totalCreditoDisciplina () {
    const colunaResultadoList = tableBody.querySelectorAll('.linha .input-credito-disciplina');
    let totalCreditoDisciplina = 0;
    for (valor of colunaResultadoList) {
        let valorNumber = Number(valor.value)
        totalCreditoDisciplina += valorNumber;
        tcdResult.innerHTML = totalCreditoDisciplina;
    }  

    return totalCreditoDisciplina;
}


function CR () {
    const creditoDisciplina = totalCreditoDisciplina();
    const CreditoDisciplinaVezesNota = totalCreditoDisciplinaVezesNota();
    const cr = CreditoDisciplinaVezesNota / creditoDisciplina;
    if (typeof(cr) !== Number) crResult.innerText = 'Insira um valor.'
    crResult.innerHTML = cr.toFixed(2);
}

function adicionarLinha(elemento) {
    const tr = criarTr();
    criaInputCreditoDisciplina(tr);
    criaInputNota(tr);
    criaInputProduto(tr);
    elemento.appendChild(tr);
    resultadoProduto();
    totalCreditoDisciplinaVezesNota();
    totalCreditoDisciplina();
    CR();
}
    

function criaInputCreditoDisciplina (element) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('class', 'input-nota input');
    input.setAttribute('type', 'number');
    td.appendChild(input);
    element.appendChild(td);
}

function criaInputNota (element) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    input.setAttribute('class', 'input-credito-disciplina input');
    input.setAttribute('type', 'number');
    td.appendChild(input);
    element.appendChild(td);   
}

function criaInputProduto (element) {
    const td = document.createElement('td');
    td.setAttribute('class', 'celula-resultado-produto');
    td.innerHTML = 0
    element.appendChild(td);
}

function criarTr () {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'linha')
    return tr;   
}

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('adicionar')) adicionarLinha(tableBody);
    if (el.classList.contains('remover')) tableBody.lastChild.remove();
    if (el.classList.contains('calcular')) {
        resultadoProduto();
        totalCreditoDisciplinaVezesNota();
        totalCreditoDisciplina();
        CR();
    }
})



