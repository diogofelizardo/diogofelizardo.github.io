/* Mensagem de boas-vindas com o nome do app e versão */

console.log(`\n%cConsole  1.0 🚀`, 'color:#0dd8d8; background:#0b1021; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #0dd8d8; border-radius: 4px;font-weight: bold; text-shadow: 1px 1px 1px #00af87bf;');

/* Mensagem de aviso */
console.info(
  `\n%c⚠️ Atenção ⚠️%c \nHouve um erro na configuração \n\n%cIsso provavelmente não é um problema do Console, mas sim da sua configuração.\nSe você acha que é um bug, por favor abra uma issue no GitHub: https://github.com/diogofelizardo`,
  "color:#ceb73f; background: #ceb73f33; font-size:1.5rem; padding:0.15rem; margin: 1rem auto; font-family: Rockwell, Tahoma, 'Trebuchet MS', Helvetica; border: 2px solid #ceb73f; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #000000bf;",
  'font-weight: bold; font-size: 1rem;color: #ceb73f;',
  "color: #ceb73f; font-size: 0.75rem; font-family: Tahoma, 'Trebuchet MS', Helvetica;",
);

/* Mensagem de status */
console.log(
  `%cStatus do Sistema\n%cTudo funcionando normalmente`,
  'font-weight: bold; color: #0dd8d8; text-decoration: underline;',
  'color: #ceb73f;',
);

/* Mensagem de erro */
console.log(
  `%cErro do Sistema\n%cFalha na operação \n%cDetalhes do erro aqui`,
  'font-weight: bold; color: #0dd8d8; text-decoration: underline;',
  'color: #ff025a',
  'color: #ff025a80;',
);

/* Mensagem com dinossauro */
console.log(
  `\n%c🦖 Modo Dino Ativado! %c\nRawr! O dinossauro está em ação`,
  'color:#4CAF50; background:#4CAF5033; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #4CAF50; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #00000080;',
  'color: #4CAF50; font-size: 1rem; font-weight: bold;'
);