---
publishDate: 2024-10-05T12:00:00Z
author: Diogo Felizardo
title: Guia Completo dos Comandos CLI do NestJS
slug: comandos-cli-nestjs-guia-completo
excerpt: Aprenda a utilizar a CLI do NestJS de forma eficiente com este guia completo. Descubra os principais comandos, entenda para que cada um serve e veja o que eles geram em seu projeto.
image: '~/assets/images/posts/13.jpg'
category: NestJS
tags:
  - nestjs
  - cli
  - comandos
metadata:
  canonical: https://diogofelizardo.github.io/comandos-cli-nestjs-guia-completo
---

Uma das grandes vantagens do NestJs é a poderosa Interface de Linha de Comando (CLI) que facilita a criação, desenvolvimento e manutenção de projetos. Neste post, vamos explorar os principais comandos do CLI do NestJS, explicando para que servem e o que eles geram.

## Índice

1. [Instalação do NestJS CLI](#instalação-do-nestjs-cli)
2. [Comandos Básicos](#comandos-básicos)
   - [`nest new`](#nest-new)
   - [`nest generate` (ou `nest g`)](#nest-generate-ou-nest-g)
   - [`nest build`](#nest-build)
   - [`nest start`](#nest-start)
   - [`nest test`](#nest-test)
   - [`nest info`](#nest-info)
3. [Comandos de Geração Específicos](#comandos-de-geração-específicos)
   - [Controladores](#controladores)
   - [Serviços](#serviços)
   - [Módulos](#módulos)
   - [Guards, Interceptors, Pipes e Filtros](#guards-interceptors-pipes-e-filtros)
   - [Gateways e Outros](#gateways-e-outros)
4. [Personalização e Opções](#personalização-e-opções)
5. [Conclusão](#conclusão)

## Instalação do NestJS CLI

Antes de começar, certifique-se de ter o [Node.js](https://nodejs.org/) instalado. Para instalar o NestJS CLI globalmente, execute:

```bash
npm install -g @nestjs/cli
```

Depois de instalado, você pode verificar a versão com:

```bash
nest --version
```

## Comandos Básicos

### `nest new`

**Descrição:** Cria um novo projeto NestJS com uma estrutura de diretórios padrão.

**Uso:**

```bash
nest new nome-do-projeto
```

**O que gera:** Uma estrutura de projeto completa com pastas como `src`, arquivos de configuração (`tsconfig.json`, `nest-cli.json`), e scripts de build e start no `package.json`.

### `nest generate` (ou `nest g`)

**Descrição:** Gera componentes específicos dentro do projeto, como controladores, serviços, módulos, etc.

**Uso:**

```bash
nest generate <schematic> <name>
```

**Abreviação:** `nest g <schematic> <name>`

**Exemplos:**

- Gerar um controlador:

  ```bash
  nest g controller users
  ```

- Gerar um serviço:

  ```bash
  nest g service auth
  ```

- Gerar um módulo:

  ```bash
  nest g module products
  ```

**O que gera:** Dependendo do schematic, cria arquivos e atualiza módulos para incluir os novos componentes.

### `nest build`

**Descrição:** Compila o projeto NestJS para JavaScript, preparando-o para execução.

**Uso:**

```bash
nest build
```

**O que gera:** Compila os arquivos TypeScript em JavaScript na pasta `dist` (ou outra especificada no `tsconfig.json`).

### `nest start`

**Descrição:** Inicia a aplicação NestJS em modo de desenvolvimento.

**Uso:**

```bash
nest start
```

**Abreviação:** `nest s`

**Opções Comuns:**

- **Modo watch:** Reinicia automaticamente a aplicação ao detectar mudanças no código.

  ```bash
  nest start --watch
  ```

**O que gera:** Executa a aplicação, permitindo que você interaja com ela localmente.

### `nest test`

**Descrição:** Executa os testes definidos no projeto.

**Uso:**

```bash
nest test
```

**O que gera:** Roda os testes unitários usando o framework de testes configurado (geralmente Jest).

### `nest info`

**Descrição:** Exibe informações sobre o ambiente e as dependências do projeto.

**Uso:**

```bash
nest info
```

**O que gera:** Mostra detalhes como a versão do NestJS, versões de dependências, sistema operacional, etc.

## Comandos de Geração Específicos

Além dos comandos básicos, o NestJS CLI oferece schematics para gerar diversos tipos de componentes. Abaixo, exploramos alguns dos mais comuns.

### Controladores

**Comando:**

```bash
nest g controller nome
```

**O que gera:**

- `nome.controller.ts`: Define as rotas e manipula as requisições HTTP. Os controladores são responsáveis por receber as requisições, delegar a lógica de negócio aos serviços e retornar as respostas ao cliente.
- `nome.controller.spec.ts`: Arquivo de testes para o controlador, permitindo validar o comportamento das rotas e a interação com os serviços.

**Exemplo:**

```bash
nest g controller users
```

Gera `users.controller.ts` e `users.controller.spec.ts`.

**Detalhamento dos Arquivos Gerados:**

- **`users.controller.ts`:**
  ```typescript
  import { Controller, Get } from '@nestjs/common';

  @Controller('users')
  export class UsersController {
    @Get()
    findAll() {
      // Lógica para retornar todos os usuários
    }
  }
  ```
  Este arquivo define um controlador para a rota `/users` com um método `findAll` que, por exemplo, poderia retornar uma lista de usuários.

- **`users.controller.spec.ts`:**
  Arquivo de teste que verifica se o controlador está funcionando corretamente, assegurando que as rotas respondem conforme esperado.

### Serviços

**Comando:**

```bash
nest g service nome
```

**O que gera:**

- `nome.service.ts`: Contém a lógica de negócios da aplicação. Os serviços são injetáveis e podem ser utilizados por controladores e outros serviços para realizar operações como acesso a banco de dados, chamadas a APIs externas, etc.
- `nome.service.spec.ts`: Arquivo de testes para o serviço, permitindo validar a lógica implementada.

**Exemplo:**

```bash
nest g service auth
```

Gera `auth.service.ts` e `auth.service.spec.ts`.

**Detalhamento dos Arquivos Gerados:**

- **`auth.service.ts`:**
  ```typescript
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class AuthService {
    validateUser(username: string, password: string): boolean {
      // Lógica para validar usuário
      return true;
    }
  }
  ```
  Este serviço poderia conter métodos para autenticação de usuários, como validação de credenciais.

- **`auth.service.spec.ts`:**
  Arquivo de teste que assegura que os métodos de autenticação estão funcionando conforme o esperado.

### Módulos

**Comando:**

```bash
nest g module nome
```

**O que gera:**

- `nome.module.ts`: Define o módulo, agrupando controladores e serviços relacionados. Os módulos ajudam a organizar a aplicação em partes coesas e reutilizáveis.

**Exemplo:**

```bash
nest g module products
```

Gera `products.module.ts`.

**Detalhamento do Arquivo Gerado:**

- **`products.module.ts`:**
  ```typescript
  import { Module } from '@nestjs/common';
  import { ProductsController } from './products.controller';
  import { ProductsService } from './products.service';

  @Module({
    controllers: [ProductsController],
    providers: [ProductsService],
  })
  export class ProductsModule {}
  ```
  Este módulo agrega o controlador e o serviço de produtos, facilitando a manutenção e escalabilidade da aplicação.

### Guards, Interceptors, Pipes e Filtros

#### Guards

**Comando:**

```bash
nest g guard nome
```

**O que gera:**

- `nome.guard.ts`: Implementa a lógica de autorização, determinando se uma requisição pode ou não prosseguir.
- `nome.guard.spec.ts`: Arquivo de testes para o guard.

**Exemplo:**

```bash
nest g guard roles
```

Gera `roles.guard.ts` e `roles.guard.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`roles.guard.ts`:**
  ```typescript
  import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
  import { Observable } from 'rxjs';

  @Injectable()
  export class RolesGuard implements CanActivate {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      // Lógica para verificar permissões de usuário
      return true;
    }
  }
  ```
  Este guard pode ser usado para verificar se o usuário possui as permissões necessárias para acessar determinadas rotas.

#### Interceptors

**Comando:**

```bash
nest g interceptor nome
```

**O que gera:**

- `nome.interceptor.ts`: Permite intervir nas requisições ou respostas, podendo modificar dados, adicionar logs, etc.
- `nome.interceptor.spec.ts`: Arquivo de testes para o interceptor.

**Exemplo:**

```bash
nest g interceptor logging
```

Gera `logging.interceptor.ts` e `logging.interceptor.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`logging.interceptor.ts`:**
  ```typescript
  import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';

  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      console.log('Antes da execução...');
      const now = Date.now();
      return next
        .handle()
        .pipe(
          tap(() => console.log(`Depois da execução... ${Date.now() - now}ms`)),
        );
    }
  }
  ```
  Este interceptor adiciona logs antes e depois da execução de uma rota, ajudando no monitoramento de performance e depuração.

#### Pipes

**Comando:**

```bash
nest g pipe nome
```

**O que gera:**

- `nome.pipe.ts`: Implementa transformação ou validação de dados antes que eles cheguem ao controlador ou serviço.
- `nome.pipe.spec.ts`: Arquivo de testes para o pipe.

**Exemplo:**

```bash
nest g pipe validation
```

Gera `validation.pipe.ts` e `validation.pipe.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`validation.pipe.ts`:**
  ```typescript
  import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

  @Injectable()
  export class ValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
      // Lógica para validar ou transformar o valor
      if (!value) {
        throw new BadRequestException('Validation failed');
      }
      return value;
    }
  }
  ```
  Este pipe pode ser usado para validar dados de entrada ou transformar dados antes que eles sejam processados pelo controlador.

#### Filtros

**Comando:**

```bash
nest g filter nome
```

**O que gera:**

- `nome.filter.ts`: Implementa tratamento de exceções personalizadas.
- `nome.filter.spec.ts`: Arquivo de testes para o filtro.

**Exemplo:**

```bash
nest g filter http
```

Gera `http.filter.ts` e `http.filter.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`http.filter.ts`:**
  ```typescript
  import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
  import { Request, Response } from 'express';

  @Catch(HttpException)
  export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();

      response
        .status(status)
        .json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    }
  }
  ```
  Este filtro captura exceções HTTP e formata a resposta de erro de maneira consistente.

### Gateways e Outros

#### Gateways (para WebSockets)

**Comando:**

```bash
nest g gateway nome
```

**O que gera:**

- `nome.gateway.ts`: Implementa a lógica para comunicação via WebSockets.
- `nome.gateway.spec.ts`: Arquivo de testes para o gateway.

**Exemplo:**

```bash
nest g gateway chat
```

Gera `chat.gateway.ts` e `chat.gateway.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`chat.gateway.ts`:**
  ```typescript
  import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
  import { Server, Socket } from 'socket.io';

  @WebSocketGateway()
  export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;

    handleConnection(client: Socket) {
      console.log(`Cliente conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
      console.log(`Cliente desconectado: ${client.id}`);
    }

    // Outros métodos para manipular eventos de WebSocket
  }
  ```
  Este gateway gerencia conexões WebSocket, permitindo a comunicação em tempo real entre o servidor e os clientes.

#### Outros Schematics

O NestJS CLI suporta diversos outros schematics para gerar componentes adicionais, como `middleware`, `decorator`, `class`, `interface`, entre outros.

**Exemplo:**

```bash
nest g middleware logger
```

Gera `logger.middleware.ts` e `logger.middleware.spec.ts`.

**Detalhamento do Arquivo Gerado:**

- **`logger.middleware.ts`:**
  ```typescript
  import { Injectable, NestMiddleware } from '@nestjs/common';
  import { Request, Response, NextFunction } from 'express';

  @Injectable()
  export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
      console.log(`Request...`);
      next();
    }
  }
  ```
  Este middleware pode ser usado para logar informações sobre cada requisição recebida pelo servidor.

## Personalização e Opções

Muitos comandos do NestJS CLI aceitam opções adicionais para personalizar a geração dos componentes. Algumas das opções mais úteis incluem:

- **Especificar o módulo onde o componente será registrado:**

  ```bash
  nest g controller users --module=app
  ```

  Isso adiciona automaticamente o controlador ao módulo especificado, evitando a necessidade de importações manuais.

- **Utilizar o sistema de arquivos em uma pasta específica:**

  ```bash
  nest g service auth --path=src/auth
  ```

  Gera os arquivos do serviço dentro da pasta `src/auth`, organizando melhor a estrutura do projeto.

- **Gerar apenas a classe sem atualizar o módulo automaticamente:**

  ```bash
  nest g guard roles --no-module
  ```

  Útil quando você deseja adicionar o componente manualmente ao módulo ou em casos específicos onde a atualização automática não é desejada.

Para ver todas as opções disponíveis para um comando, use a flag `--help`. Por exemplo:

```bash
nest g controller --help
```

Isso exibirá todas as opções e flags que podem ser utilizadas com o comando de geração de controladores.

## Conclusão

O CLI do NestJS é uma ferramenta poderosa que acelera significativamente o desenvolvimento, automatizando tarefas repetitivas e garantindo uma estrutura de projeto consistente. Compreender e dominar esses comandos pode melhorar sua produtividade e a qualidade do seu código. Experimente os comandos apresentados neste guia e descubra como o NestJS CLI pode transformar sua experiência de desenvolvimento!

---

**Gostou deste post?** Não esqueça de compartilhar e deixar seu comentário abaixo. Para mais conteúdos sobre desenvolvimento, continue acompanhando o nosso blog!