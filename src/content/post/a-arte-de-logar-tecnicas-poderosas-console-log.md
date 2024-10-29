---
publishDate: 2024-10-29T05:00:00Z
author: Diogo Felizardo
title: 'A Arte de Logar: Técnicas Poderosas com console.log()📟'
slug: a-arte-de-logar-tecnicas-poderosas-console-log-javascript
excerpt: 'Descubra dicas avançadas para utilizar console.log()'
image: '~/assets/images/posts/16.jpg'
category: JavaScript
tags:
  - javascript
  - console
  - ferramentas
  - produtividade
metadata:
  canonical: https://diogofelizardo.github.io/a-arte-de-logar-tecnicas-poderosas-console-log-javascript
---

Se você já desenvolveu uma aplicação web utilizando JavaScript, provavelmente está familiarizado com `console.log(...)`, o método que imprime dados no console do desenvolvedor; útil para depuração, registro e testes.

Execute `console.log(console)`, e você verá que há muito mais no objeto `console`.
Este post descreve brevemente os 10 melhores truques que você pode usar para aprimorar sua experiência de logging em JavaScript.

## Conteúdo
- [Tabelas](#tabelas)
- [Grupos](#grupos)
- [Logs Estilizados](#logs-estilizados)
- [Tempos](#tempos)
- [Assertivas](#assertivas)
- [Contagens](#contagens)
- [Rastreios](#rastreios)
- [Diretório](#diretório)
- [Debugs](#debugs)
- [Níveis de Log](#níveis-de-log)
- [Logs com Múltiplos Valores](#logs-com-múltiplos-valores)
- [Formatos de Strings no Log](#formatos-de-strings-no-log)
- [Limpar Console](#limpar-console)
- [Métodos Especiais do Navegador](#métodos-especiais-do-navegador)

## Tabelas
O método `console.table()` imprime objetos/arrays como tabelas formatadas de maneira organizada.

```javascript
const systemInfo = {
  'Carimbo de Tempo': new Date().getTime(),
  'OS': navigator.platform,
  'Navegador': navigator.appCodeName,
  'Idioma': navigator.language,
};

console.table(systemInfo);
```
Exemplo de saída do console.table
![Exemplo de saída do console.table](~/assets/images/posts/16/table.png)



## Grupos
Agrupe declarações de console relacionadas com seções expansíveis, usando `console.group()`.

Você pode opcionalmente dar um título para a seção, passando uma string como parâmetro. As seções podem ser recolhidas e expandidas no console, mas você também pode ter uma seção recolhida por padrão, usando `groupCollapsed` em vez de `group`. Você também pode aninhar sub-seções dentro de seções, mas lembre-se de fechar cada grupo com `groupEnd`.

O exemplo a seguir irá exibir uma seção aberta, contendo algumas informações:

```javascript
console.group('Informações da URL');
  console.log('Protocolo', window.location.protocol);
  console.log('Host', window.location.origin);
  console.log('Caminho', window.location.pathname);
  console.groupCollapsed('Informações Meta');
    console.log('Data da Busca', new Date().getTime());
    console.log('OS', navigator.platform);
    console.log('Navegador', navigator.appCodeName);
    console.log('Idioma', navigator.language);
  console.groupEnd();
console.groupEnd();
```
Exemplo de saída do console.group
![Exemplo de saída do console.group](~/assets/images/posts/16/group.png)


## Logs Estilizados
É possível estilizar suas saídas de log com CSS básico, como cores, fontes, estilos de texto e tamanhos. Note que o suporte do navegador para isso pode variar bastante.

Por exemplo, tente executar o seguinte:

```javascript
console.log(
  '%cOlá Mundo!',
  'color: #f709bb; font-family: sans-serif; text-decoration: underline;'
);
```

Você deverá ver a seguinte saída:
![Exemplo de saída do console.log com CSS](~/assets/images/posts/16/style.png)

Muito massa, não? Há muito mais que você pode fazer também!
Talvez mudar a fonte, estilo, cor de fundo e adicionar curvas...

```javascript
/* Mensagem com dinossauro */
console.log(
  `\n%c🦖 Modo Dino Ativado! %c\nRawr! O dinossauro está em ação`,
  'color:#4CAF50; background:#4CAF5033; font-size:1.5rem; padding:0.15rem 0.25rem; margin: 1rem auto; font-family: Rockwell; border: 2px solid #4CAF50; border-radius: 4px; font-weight: bold; text-shadow: 1px 1px 1px #00000080;',
  'color: #4CAF50; font-size: 1rem; font-weight: bold;'
);
```
![Exemplo de saída do console.log com CSS](~/assets/images/posts/16/style2.png)

Aqui está algo semelhante que estou usando em um dashboard de desenvolvedor:

```javascript
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
```

![Exemplo de saída do console.log com CSS](~/assets/images/posts/16/style3.png)

## Tempos
Outra técnica comum de depuração é medir o tempo de execução, para acompanhar quanto tempo uma operação leva. Isso pode ser feito iniciando um timer com `console.time()` e passando um rótulo, depois terminando o timer com `console.timeEnd()`, usando o mesmo rótulo. Você também pode adicionar marcadores dentro de uma operação de longa duração usando `console.timeLog()`.

```javascript
console.time("concatenação");
let output = "";
for (let i = 1; i <= 1e6; i++) {
  output += i;
}
console.timeEnd("concatenação");
```
Exemplo de saída do console.time
![Exemplo de saída do console.time](~/assets/images/posts/16/timer.png)

## Assertivas
Você pode querer registrar no console apenas se ocorrer um erro, ou se uma certa condição for verdadeira ou falsa. Isso pode ser feito usando `console.assert()`, que não registrará nada no console a menos que o primeiro parâmetro seja falso.

O primeiro parâmetro é uma condição booleana para verificar, seguido de 0 ou mais pontos de dados que você gostaria de imprimir, e o último parâmetro é uma mensagem para exibir. Portanto, `console.assert(false, 'O valor era falso')` exibirá a mensagem, já que o primeiro parâmetro é falso.

```javascript
const msgErro = 'o número não é par';
for (let num = 2; num <= 5; num++) {
  console.log(`O número é ${num}`);
  console.assert(num % 2 === 0, { num }, msgErro);
}
```
Exemplo de saída do console.assert
![Exemplo de saída do console.assert](~/assets/images/posts/16/assert.png)

## Contagens
Já se pegou incrementando manualmente um número para logging? `console.count()` é útil para acompanhar quantas vezes algo foi executado, ou com que frequência um bloco de código foi acessado.

Você pode opcionalmente dar um rótulo para seu contador, o que permitirá gerenciar múltiplos contadores e tornar a saída mais clara.
Os contadores sempre come��am a partir de 1. Você pode resetar um contador a qualquer momento com `console.countReset()`, que também aceita um parâmetro de rótulo opcional.

O código a seguir irá incrementar o contador para cada item no array, o valor final será 8.

```javascript
const numeros = [1, 2, 3, 30, 69, 120, 240, 420];
numeros.forEach((num) => {
  console.count();
});
```

A seguir, um exemplo de saída de contadores rotulados:
![Exemplo de saída do console.count](~/assets/images/posts/16/count.png)

Em vez de passar um rótulo, se você usar um valor, terá um contador separado para cada valor da condição. Por exemplo:

```javascript
console.count(NaN);               // NaN: 1
console.count(NaN + 3);           // NaN: 2
console.count(1 / 0);             // Infinity: 1
console.count(String(1 / 0));     // Infinity: 2
```

## Rastreios
Em JavaScript (e TypeScript), frequentemente trabalhamos com métodos e objetos profundamente aninhados. Você pode usar `console.trace()` para percorrer a stack trace e exibir quais métodos foram chamados para chegar a um determinado ponto.

```javascript
function primeiraFuncao() {
  segundaFuncao();
}
function segundaFuncao() {
  terceiraFuncao();
}
function terceiraFuncao() {
  console.trace("Rastreamento da stack");
}
primeiraFuncao();
```

A seguir, um exemplo de saída usando console.trace:
![Exemplo de saída do  console.trace](~/assets/images/posts/16/trace.png)

Você pode opcionalmente passar dados para também serem exibidos junto com a stack trace.

## Diretório
Se você está registrando um objeto grande no console, pode se tornar difícil de ler. O método `console.dir()` irá formatá-lo em uma estrutura de árvore expansível.

```javascript
const usuario = {
  nome: "Alicia",
  idade: 30,
  interesses: ["programação", "música", "esportes"],
};

console.dir(usuario);
```

A seguir o exemplo de uma saída de console no estilo diretório:
![Exemplo de saída do console.dir](~/assets/images/posts/16/dir.png)

Você também pode imprimir árvores baseadas em XML ou HTML de maneira similar, usando `console.dirxml()`.

## Debugs
Você pode ter alguns logs configurados dentro da sua aplicação que são úteis durante o desenvolvimento, mas que você não deseja que o usuário veja. Substituir as declarações de log por `console.debug()` fará exatamente isso, funcionando da mesma maneira que `console.log` mas sendo removido pela maioria dos sistemas de build ou desabilitado quando em modo de produção.

```javascript
console.debug("Este é um log de debug útil para desenvolvedores.");
```

## Níveis de Log
Você pode ter notado que há vários filtros no console do navegador (info, warnings e error), que permitem mudar a verbosidade dos dados registrados. Para usar esses filtros, basta substituir as declarações de log por uma das seguintes:

- `console.info()` - Mensagens informativas para propósitos de log, comumente inclui um pequeno "i" e/ou um fundo azul
- `console.warn()` - Avisos / erros não críticos, comumente inclui um ponto de exclamação triangular e/ou um fundo amarelo
- `console.error()` - Erros que podem afetar a funcionalidade, comumente inclui um ponto de exclamação circular e/ou um fundo vermelho

No Node.js, diferentes níveis de log são escritos em diferentes streams quando em produção, por exemplo, `error()` escreve em `stderr`, enquanto `log` escreve em `stdout`, mas durante o desenvolvimento todos aparecerão no console normalmente.

```javascript
console.info("Esta é uma mensagem informativa.");
console.warn("Este é um aviso.");
console.error("Este é um erro crítico.");
```

## Logs com Múltiplos Valores
A maioria das funções no objeto `console` aceitará múltiplos parâmetros, então você pode adicionar rótulos à sua saída ou imprimir múltiplos pontos de dados ao mesmo tempo. Por exemplo: `console.log('Usuário: ', usuario.nome);`

Mas uma abordagem mais fácil para imprimir múltiplos valores rotulados é usar a desestruturação de objetos. Por exemplo, se você tiver três variáveis (por exemplo, `x`, `y` e `z`), você pode registrá-las como um objeto envolvendo-as em chaves, de modo que o nome e o valor de cada variável sejam exibidos - como `console.log({ x, y, z });`

```javascript
const x = 10;
const y = "TypeScript";
const z = true;

console.log({ x, y, z });
```

Exemplo de saída do console.log com valores
![Exemplo de saída do console.log com valores](~/assets/images/posts/16/values.png)

## Formatos de Strings no Log
Se você precisa construir strings formatadas para exibir, pode fazer isso com printf estilo C usando especificadores de formato.

Os seguintes especificadores são suportados:

- `%s` - String ou qualquer outro tipo convertido para string
- `%d` / `%i` - Inteiro
- `%f` - Float
- `%o` - Usa formatação ótima
- `%O` - Usa formatação padrão
- `%c` - Usa formatação customizada (mais informações)

Por exemplo:

```javascript
const nome = "Alicia";
const ano = new Date().getFullYear();

console.log("Olá %s, bem-vindo ao ano %d!", nome, ano);
// Olá Alicia, bem-vindo ao ano 2024!
```

Claro, você também poderia usar template literals para alcançar o mesmo resultado, o que pode ser mais fácil de ler para strings mais curtas.

```javascript
console.log(`Olá ${nome}, bem-vindo ao ano ${ano}!`);
```

## Limpar Console
Finalmente, quando você está procurando por uma saída de um evento, pode querer remover tudo o que foi registrado no console quando a página foi carregada. Isso pode ser feito com `console.clear()`, que irá limpar todo o conteúdo, mas não resetar quaisquer dados.

Normalmente, também é possível limpar o console clicando no ícone da Lixeira, além de pesquisar através dele usando a caixa de texto de filtro.

```javascript
console.clear();
```

## Métodos Especiais do Navegador
Ao executar código diretamente no console do navegador, você terá acesso a alguns métodos abreviados que são super úteis para depuração, automação e testes.

Os mais úteis são:

- `$()` - Abreviação para `Document.querySelector()` (para selecionar elementos DOM, estilo jQuery!)
- `$$()` - Igual ao acima, mas para `querySelectorAll` quando retornando múltiplos elementos em um array
- `$_` - Retorna o valor da última expressão avaliada
- `$0` - Retorna o elemento DOM mais recentemente selecionado (no inspetor)
- `$1...$4` também podem ser usados para pegar elementos da UI selecionados anteriormente
- `$x()` - Permite selecionar elementos DOM usando uma consulta XPath
- `keys()` e `values()` - Abreviação para `Object.keys()`, retornando um array de chaves ou valores do objeto
- `copy()` - Copia conteúdo para a área de transferência
- `monitorEvents()` - Executa um comando cada vez que um evento específico é disparado

Para certos comandos comuns do console (como `console.table()`), você não precisa digitar o prefixo `console.`, basta executar `table()`

Há muitos mais comandos do console, [aqui está uma lista completa](https://developer.chrome.com/docs/devtools/console/reference).

## E mais...
Há muito mais que você pode fazer com logs no console! Para mais informações, confira a [Documentação do Console no MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/console) ou os [Docs do Console de Desenvolvedor do Chrome](https://developer.chrome.com/docs/devtools/console/).