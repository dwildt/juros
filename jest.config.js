/**
 * Configuração do Jest para testes unitários
 * @type {import('jest').Config}
 */
module.exports = {
  // Ambiente de testes (jsdom para simular navegador)
  testEnvironment: 'jsdom',

  // Padrão de arquivos de teste
  testMatch: [
    '**/testes/unitarios/**/*.test.js',
    '**/testes/unitarios/**/*.spec.js'
  ],

  // Cobertura de código
  collectCoverage: false,
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/**/*.test.js',
    '!src/**/*.spec.js'
  ],

  // Diretório de cobertura
  coverageDirectory: 'cobertura',

  // Relatórios de cobertura
  coverageReporters: [
    'text',
    'text-summary',
    'html',
    'lcov'
  ],

  // Limites de cobertura
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },

  // Arquivos de configuração a serem executados antes dos testes
  setupFilesAfterEnv: [],

  // Transformações
  transform: {},

  // Extensões de módulo
  moduleFileExtensions: ['js', 'json'],

  // Verbose output
  verbose: true,

  // Limpar mocks automaticamente entre testes
  clearMocks: true,

  // Restaurar mocks automaticamente entre testes
  restoreMocks: true
};
