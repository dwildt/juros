/**
 * Arquivo Principal da Aplicação
 * Inicializa os componentes principais
 */

import { Calculadora } from './componentes/organismos/calculadora.js';
import { GerenciadorTemas } from './componentes/organismos/gerenciador-temas.js';

/**
 * Inicializa a aplicação quando o DOM estiver pronto
 */
function inicializarAplicacao() {
    // Inicializar gerenciador de temas
    const gerenciadorTemas = new GerenciadorTemas();
    console.log('Gerenciador de temas inicializado');
    console.log(
        `Tema atual: ${gerenciadorTemas.obterCorAtual()} - ${gerenciadorTemas.obterModoAtual()}`
    );

    // Inicializar calculadora
    const formulario = document.querySelector('#formulario-calculadora');
    if (formulario) {
        const calculadora = new Calculadora(formulario);
        console.log('Calculadora inicializada');
    } else {
        console.error('Formulário da calculadora não encontrado');
    }
}

// Aguardar o DOM estar completamente carregado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAplicacao);
} else {
    inicializarAplicacao();
}
