/**
 * Componente Organismo: Calculadora
 * Gerencia a lógica da calculadora de financiamento
 */

import * as calculos from '../../utils/calculos.js';
import * as validacao from '../../utils/validacao.js';
import * as formatacao from '../../utils/formatacao.js';

export class Calculadora {
    constructor(elementoFormulario) {
        this.formulario = elementoFormulario;
        this.campos = {
            valorFinanciado: this.formulario.querySelector('#valor-financiado'),
            taxaJuros: this.formulario.querySelector('#taxa-juros'),
            numeroDeMeses: this.formulario.querySelector('#numero-meses'),
            valorPrestacao: this.formulario.querySelector('#valor-prestacao')
        };
        this.botaoCalcular = this.formulario.querySelector('#botao-calcular');
        this.botaoLimpar = this.formulario.querySelector('#botao-limpar');
        this.areaResultados = document.querySelector('#resultados');

        this.inicializar();
    }

    inicializar() {
        // Event listeners
        this.botaoCalcular.addEventListener('click', (e) => {
            e.preventDefault();
            this.calcular();
        });

        this.botaoLimpar.addEventListener('click', (e) => {
            e.preventDefault();
            this.limpar();
        });

        // Limpar mensagens de erro ao digitar
        Object.values(this.campos).forEach((campo) => {
            campo.addEventListener('input', () => {
                this.limparErro(campo);
            });
        });
    }

    obterValoresCampos() {
        const valores = {};

        Object.entries(this.campos).forEach(([nome, campo]) => {
            const valor = campo.value.trim();
            if (valor === '') {
                valores[nome] = null;
            } else {
                const resultado = validacao.validarCampoNumerico(valor);
                valores[nome] = resultado.valido ? resultado.valor : null;
            }
        });

        return valores;
    }

    validarEntradas(valores) {
        let valido = true;
        const erros = {};

        // Validar campos preenchidos
        const validacaoPreenchimento = validacao.validarCamposPreenchidos(valores);
        if (!validacaoPreenchimento.valido) {
            this.mostrarErroGeral(validacaoPreenchimento.mensagem);
            return false;
        }

        // Validar cada campo preenchido
        if (valores.valorFinanciado !== null) {
            const resultado = validacao.validarValorFinanciado(valores.valorFinanciado);
            if (!resultado.valido) {
                erros.valorFinanciado = resultado.mensagem;
                valido = false;
            }
        }

        if (valores.taxaJuros !== null) {
            const resultado = validacao.validarTaxaJuros(valores.taxaJuros);
            if (!resultado.valido) {
                erros.taxaJuros = resultado.mensagem;
                valido = false;
            }
        }

        if (valores.numeroDeMeses !== null) {
            const resultado = validacao.validarNumeroDeMeses(valores.numeroDeMeses);
            if (!resultado.valido) {
                erros.numeroDeMeses = resultado.mensagem;
                valido = false;
            }
        }

        if (valores.valorPrestacao !== null) {
            const resultado = validacao.validarValorPrestacao(valores.valorPrestacao);
            if (!resultado.valido) {
                erros.valorPrestacao = resultado.mensagem;
                valido = false;
            }
        }

        // Mostrar erros
        if (!valido) {
            Object.entries(erros).forEach(([campo, mensagem]) => {
                this.mostrarErro(this.campos[campo], mensagem);
            });
        }

        return valido;
    }

    calcular() {
        // Limpar erros anteriores
        this.limparTodosErros();
        this.limparResultados();

        // Obter valores
        const valores = this.obterValoresCampos();

        // Validar
        if (!this.validarEntradas(valores)) {
            return;
        }

        // Identificar qual campo calcular
        const campoParaCalcular = validacao.identificarCampoParaCalcular(valores);

        if (!campoParaCalcular) {
            this.mostrarErroGeral('Deixe um campo vazio para ser calculado');
            return;
        }

        try {
            let resultado;
            const taxaDecimal =
                valores.taxaJuros !== null
                    ? calculos.converterPorcentagemParaDecimal(valores.taxaJuros)
                    : null;

            switch (campoParaCalcular) {
                case 'valorFinanciado':
                    resultado = calculos.calcularValorFinanciado(
                        valores.valorPrestacao,
                        taxaDecimal,
                        valores.numeroDeMeses
                    );
                    this.mostrarResultados({
                        tipo: 'valorFinanciado',
                        valor: resultado,
                        taxaJuros: valores.taxaJuros,
                        numeroDeMeses: valores.numeroDeMeses,
                        valorPrestacao: valores.valorPrestacao
                    });
                    break;

                case 'taxaJuros':
                    const taxaCalculada = calculos.calcularTaxaJuros(
                        valores.valorFinanciado,
                        valores.numeroDeMeses,
                        valores.valorPrestacao
                    );
                    resultado = calculos.converterDecimalParaPorcentagem(taxaCalculada);
                    this.mostrarResultados({
                        tipo: 'taxaJuros',
                        valor: resultado,
                        valorFinanciado: valores.valorFinanciado,
                        numeroDeMeses: valores.numeroDeMeses,
                        valorPrestacao: valores.valorPrestacao
                    });
                    break;

                case 'numeroDeMeses':
                    resultado = calculos.calcularNumeroDeMeses(
                        valores.valorFinanciado,
                        taxaDecimal,
                        valores.valorPrestacao
                    );
                    this.mostrarResultados({
                        tipo: 'numeroDeMeses',
                        valor: resultado,
                        valorFinanciado: valores.valorFinanciado,
                        taxaJuros: valores.taxaJuros,
                        valorPrestacao: valores.valorPrestacao
                    });
                    break;

                case 'valorPrestacao':
                    resultado = calculos.calcularPrestacao(
                        valores.valorFinanciado,
                        taxaDecimal,
                        valores.numeroDeMeses
                    );
                    this.mostrarResultados({
                        tipo: 'valorPrestacao',
                        valor: resultado,
                        valorFinanciado: valores.valorFinanciado,
                        taxaJuros: valores.taxaJuros,
                        numeroDeMeses: valores.numeroDeMeses
                    });
                    break;
            }
        } catch (erro) {
            this.mostrarErroGeral(erro.message);
        }
    }

    mostrarResultados(dados) {
        const { tipo, valor } = dados;
        let html = '<div class="cartao cartao--destaque">';
        html += '<div class="cartao__cabecalho">';
        html += '<h3 class="cartao__titulo">Resultado do Cálculo</h3>';
        html += '</div>';
        html += '<div class="cartao__corpo">';

        // Resultado principal
        html += '<div class="resultado-principal">';
        switch (tipo) {
            case 'valorFinanciado':
                html += `<p class="resultado-principal__label">Valor Financiado</p>`;
                html += `<p class="resultado-principal__valor">${formatacao.formatarMoeda(valor)}</p>`;
                break;
            case 'taxaJuros':
                html += `<p class="resultado-principal__label">Taxa de Juros Mensal</p>`;
                html += `<p class="resultado-principal__valor">${formatacao.formatarPercentual(valor, true)}</p>`;
                break;
            case 'numeroDeMeses':
                html += `<p class="resultado-principal__label">Número de Meses</p>`;
                html += `<p class="resultado-principal__valor">${formatacao.formatarMeses(valor)}</p>`;
                break;
            case 'valorPrestacao':
                html += `<p class="resultado-principal__label">Valor da Prestação</p>`;
                html += `<p class="resultado-principal__valor">${formatacao.formatarMoeda(valor)}</p>`;
                break;
        }
        html += '</div>';

        // Informações adicionais
        html += '<div class="resultado-detalhes">';

        const valorFin = dados.valorFinanciado || valor;
        const prestacao = dados.valorPrestacao || valor;
        const meses = dados.numeroDeMeses || valor;

        const totalPago = calculos.calcularValorTotalPago(prestacao, meses);
        const totalJuros = calculos.calcularTotalJurosPagos(valorFin, prestacao, meses);

        html += `<div class="resultado-item">`;
        html += `<span class="resultado-item__label">Valor Total Pago:</span>`;
        html += `<span class="resultado-item__valor">${formatacao.formatarMoeda(totalPago)}</span>`;
        html += `</div>`;

        html += `<div class="resultado-item">`;
        html += `<span class="resultado-item__label">Total de Juros:</span>`;
        html += `<span class="resultado-item__valor">${formatacao.formatarMoeda(totalJuros)}</span>`;
        html += `</div>`;

        html += '</div>';
        html += '</div>';
        html += '</div>';

        this.areaResultados.innerHTML = html;
        this.areaResultados.style.display = 'block';
    }

    limpar() {
        // Limpar todos os campos
        Object.values(this.campos).forEach((campo) => {
            campo.value = '';
        });

        // Limpar erros
        this.limparTodosErros();

        // Limpar resultados
        this.limparResultados();
    }

    limparResultados() {
        this.areaResultados.innerHTML = '';
        this.areaResultados.style.display = 'none';
    }

    mostrarErro(campo, mensagem) {
        const campoFormulario = campo.closest('.campo-formulario');
        campoFormulario.classList.add('campo-formulario--erro');

        const textoAjuda = campoFormulario.querySelector('.texto-ajuda');
        if (textoAjuda) {
            textoAjuda.textContent = mensagem;
            textoAjuda.classList.add('texto-ajuda--erro');
        }

        campo.classList.add('input--erro');
    }

    limparErro(campo) {
        const campoFormulario = campo.closest('.campo-formulario');
        campoFormulario.classList.remove('campo-formulario--erro');

        const textoAjuda = campoFormulario.querySelector('.texto-ajuda');
        if (textoAjuda) {
            textoAjuda.textContent = '';
            textoAjuda.classList.remove('texto-ajuda--erro');
        }

        campo.classList.remove('input--erro');
    }

    limparTodosErros() {
        Object.values(this.campos).forEach((campo) => {
            this.limparErro(campo);
        });

        const mensagemErroGeral = document.querySelector('#erro-geral');
        if (mensagemErroGeral) {
            mensagemErroGeral.style.display = 'none';
            mensagemErroGeral.textContent = '';
        }
    }

    mostrarErroGeral(mensagem) {
        const mensagemErro = document.querySelector('#erro-geral');
        if (mensagemErro) {
            mensagemErro.textContent = mensagem;
            mensagemErro.style.display = 'block';
        }
    }
}
