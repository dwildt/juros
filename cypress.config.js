const { defineConfig } = require('cypress');

/**
 * Configuração do Cypress para testes E2E
 */
module.exports = defineConfig({
  e2e: {
    // URL base da aplicação
    baseUrl: 'http://localhost:3000',

    // Padrão de arquivos de teste
    specPattern: 'testes/e2e/**/*.cy.js',

    // Pasta de suporte
    supportFile: false,

    // Pasta de fixtures
    fixturesFolder: 'testes/e2e/fixtures',

    // Pasta de screenshots
    screenshotsFolder: 'testes/e2e/screenshots',

    // Pasta de vídeos
    videosFolder: 'testes/e2e/videos',

    // Configurações de viewport
    viewportWidth: 1280,
    viewportHeight: 720,

    // Timeout padrão
    defaultCommandTimeout: 10000,

    // Executar testes em modo headless
    video: false,

    // Screenshots apenas em falhas
    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // Implementar listeners de eventos do Node aqui
      return config;
    }
  }
});
