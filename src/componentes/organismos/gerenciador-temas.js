/**
 * Componente Organismo: Gerenciador de Temas
 * Gerencia a troca de cores e modo escuro
 */

export class GerenciadorTemas {
    constructor() {
        this.corAtual = 'azul';
        this.modoEscuro = false;

        this.cores = ['azul', 'verde', 'laranja', 'roxo'];

        this.carregarPreferencias();
        this.aplicarTema();
        this.inicializarControles();
    }

    carregarPreferencias() {
        // Carregar do localStorage
        const corSalva = localStorage.getItem('tema-cor');
        const modoSalvo = localStorage.getItem('tema-modo');

        if (corSalva && this.cores.includes(corSalva)) {
            this.corAtual = corSalva;
        }

        if (modoSalvo) {
            this.modoEscuro = modoSalvo === 'escuro';
        } else {
            // Detectar preferência do sistema
            this.modoEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
    }

    salvarPreferencias() {
        localStorage.setItem('tema-cor', this.corAtual);
        localStorage.setItem('tema-modo', this.modoEscuro ? 'escuro' : 'claro');
    }

    aplicarTema() {
        const html = document.documentElement;

        // Aplicar cor
        html.setAttribute('data-tema-cor', this.corAtual);

        // Aplicar modo
        html.setAttribute('data-tema-modo', this.modoEscuro ? 'escuro' : 'claro');
    }

    alterarCor(novaCor) {
        if (!this.cores.includes(novaCor)) {
            console.error(`Cor inválida: ${novaCor}`);
            return;
        }

        this.corAtual = novaCor;
        this.aplicarTema();
        this.salvarPreferencias();
        this.atualizarControles();
    }

    alternarModoEscuro() {
        this.modoEscuro = !this.modoEscuro;
        this.aplicarTema();
        this.salvarPreferencias();
        this.atualizarControles();
    }

    inicializarControles() {
        // Botões de cor
        this.cores.forEach((cor) => {
            const botao = document.querySelector(`[data-cor="${cor}"]`);
            if (botao) {
                botao.addEventListener('click', () => {
                    this.alterarCor(cor);
                });
            }
        });

        // Toggle de modo escuro
        const toggleModo = document.querySelector('#toggle-modo-escuro');
        if (toggleModo) {
            toggleModo.addEventListener('change', () => {
                this.alternarModoEscuro();
            });
        }

        // Atualizar estado inicial dos controles
        this.atualizarControles();
    }

    atualizarControles() {
        // Atualizar botões de cor
        this.cores.forEach((cor) => {
            const botao = document.querySelector(`[data-cor="${cor}"]`);
            if (botao) {
                if (cor === this.corAtual) {
                    botao.classList.add('seletor-tema__cor--ativo');
                    botao.setAttribute('aria-pressed', 'true');
                } else {
                    botao.classList.remove('seletor-tema__cor--ativo');
                    botao.setAttribute('aria-pressed', 'false');
                }
            }
        });

        // Atualizar toggle de modo escuro
        const toggleModo = document.querySelector('#toggle-modo-escuro');
        if (toggleModo) {
            toggleModo.checked = this.modoEscuro;
        }
    }

    obterCorAtual() {
        return this.corAtual;
    }

    obterModoAtual() {
        return this.modoEscuro ? 'escuro' : 'claro';
    }
}
