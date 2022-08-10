const inputNota = document.querySelector('.input-nota');
const inputCh = document.querySelector('.input-ch');
const total = document.querySelector('.total');
const tBody = document.querySelector('.tbody')
const celulaInput = document.querySelector('.celula-input');
let valoresNota;
let valoresCh;
let valoresTotal;

function criaLinha() {
    const tr = document.createElement('tr');
    tr.setAttribute('class', 'linha');
    return tr;
}

function criaCelulaTotal() {
    const td = document.createElement('td');
    td.setAttribute('class', 'total celula');
    td.setAttribute('class', 'total celula');
    return td;
}

function criaCelulaNota(valor) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    td.setAttribute('class', 'celula celula-input');
    input.setAttribute('class', 'input-nota input-valor');
    input.setAttribute('type', 'number');
    td.appendChild(input);
    input.value = valor; 
    return td;
}

function criaCelulaCh(valor) {
    const td = document.createElement('td');
    const input = document.createElement('input');
    td.setAttribute('class', 'celula celula-input');
    input.setAttribute('class', 'input-ch input-valor');
    input.setAttribute('type', 'number')
    td.appendChild(input);
    input.value = valor;
    return td;
}

function inserirLinha() {
    const tr = criaLinha();
    const tdn = criaCelulaNota();
    const tdch = criaCelulaCh();
    const tdt = criaCelulaTotal();

    tr.appendChild(tdn);
    tr.appendChild(tdch);
    tr.appendChild(tdt);
    tBody.appendChild(tr);
}

function removerLinha() {
    tBody.lastChild.remove();
}

function calculaCr() {
    let totalCh = 0;
    let totalChVezesNota = 0;
    for(let i = 0; i < valoresCh.length; i++) {
        totalCh += valoresCh[i];
        totalChVezesNota += (valoresCh[i] * valoresNota[i]);
        valoresTotal[i].innerHTML = (valoresCh[i] * valoresNota[i]);
    }

    const cr = totalChVezesNota / totalCh;
    return cr.toFixed(2);
}

function inserirCr() {
    const cr = document.querySelector('.cr');
    cr.innerHTML = calculaCr();
}

function guardaValoresTotal() {
    const valores = document.querySelectorAll('.total');
    valoresTotal = [];

    for(let valor of valores) {
        valoresTotal.push(valor);
    }
}

function guardaValoresNota() {
    const valores = document.querySelectorAll('.input-nota');
    valoresNota = [];
    for(let valor of valores) {
        let valorInput = Number(valor.value);
        valoresNota.push(valorInput);
    }

    const valoresNotaJSON = JSON.stringify(valoresNota);
    localStorage.setItem('valoresNota', valoresNotaJSON);
}

function guardaValoresCh() {
    const valores = document.querySelectorAll('.input-ch');
    valoresCh = [];
    for(let valor of valores) {
        let valorInput = Number(valor.value);
        valoresCh.push(valorInput);
    }

    const valoresChJSON = JSON.stringify(valoresCh);
    localStorage.setItem('valoresCh', valoresChJSON);
}

function criaCelulaComValoresGuardados(ch, nota) {
    const tr = criaLinha();
    const celulaCh = criaCelulaCh(ch);
    const celulaNota = criaCelulaNota(nota);
    const celulaTotal = criaCelulaTotal();

    tr.appendChild(celulaNota);
    tr.appendChild(celulaCh);
    tr.appendChild(celulaTotal);
    tBody.appendChild(tr);
}

function adicionaValores() {
    const valoresNota = localStorage.getItem('valoresNota');
    const listaDeValoresNota = JSON.parse(valoresNota);

    const valoresCh = localStorage.getItem('valoresCh');
    const listaDeValoresCh = JSON.parse(valoresCh);

    let listaCh;
    let listaNotas;

    for (let i = 0; i < listaDeValoresNota.length; i++) {
        listaCh = listaDeValoresCh[i];
        listaNotas = listaDeValoresNota[i];
        criaCelulaComValoresGuardados(listaCh, listaNotas)
    } 
}
adicionaValores();

document.addEventListener('click', function(e) {
    const el = e.target;

    if(el.classList.contains('inserir')) {
        inserirLinha();
        guardaValoresTotal();
        guardaValoresNota();
        guardaValoresCh();
        inserirCr();
    }

    if(el.classList.contains('remover')) {
        removerLinha();
        guardaValoresTotal();
        guardaValoresNota();
        guardaValoresCh();
        inserirCr();
    }

    if(el.classList.contains('calcular')) {
        guardaValoresTotal();
        guardaValoresNota();
        guardaValoresCh();
        calculaCr();
        inserirCr();
    }
})
