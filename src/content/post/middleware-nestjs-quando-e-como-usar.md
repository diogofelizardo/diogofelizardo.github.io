---
publishDate: 2023-09-24T19:40:00Z
author: Diogo Felizardo
title: 'Middleware no NestJS: Quando e Como Usar'
excerpt: Entenda como usar middleware no NestJS para manipular requisições antes de atingir o controller, com exemplos práticos de implementação.
image: '~/assets/images/posts/2.jpg'
category: NestJS
tags:
  - nestjs
  - middleware
  - desenvolvimento
metadata:
  canonical: https://diogofelizardo.github.io/middleware-nestjs-quando-e-como-usar
---

O NestJS é um framework robusto que facilita o desenvolvimento de aplicações Node.js com arquitetura modular e altamente escalável. Um dos recursos mais úteis para controlar o fluxo de requisições é o **middleware**.

Neste post, você vai entender o que é middleware, quando utilizá-lo e como implementá-lo em sua aplicação NestJS.

## O Que é Middleware?

O middleware é uma função que é executada antes de chegar ao controlador (controller). Ele tem acesso ao objeto de solicitação (`req`), resposta (`res`) e à próxima função de middleware da pilha (`next`). O middleware pode manipular, modificar ou bloquear as requisições antes de atingir os controladores.

### Exemplos de Uso Comum de Middleware:
- **Autenticação**: Verificar se um usuário está autenticado.
- **Logging**: Registrar informações sobre cada requisição.
- **Validação**: Validar o corpo da requisição antes de prosseguir.
- **Modificação de Requisições**: Alterar ou adicionar dados à requisição antes que ela seja processada pelo controlador.

## Quando Usar Middleware?

Você deve usar o middleware quando precisar manipular ou modificar as requisições globalmente ou para rotas específicas. É uma maneira eficaz de separar responsabilidades no código, evitando misturar lógica de controle com tarefas repetitivas, como autenticação ou logs.

Algumas situações em que o middleware é útil:
- Quando precisa de um controle antes de qualquer rota ser executada.
- Para interceptar requisições e processar informações como headers, logs, ou cookies.
- Para aplicar segurança ou bloqueios em rotas de maneira centralizada.

## Como Criar Middleware no NestJS

### Passo 1: Criando um Middleware

No NestJS, criar um middleware é bem simples. Vamos começar criando um middleware de logging para registrar informações sobre cada requisição.

Crie um arquivo chamado `logger.middleware.ts` no diretório `src/middleware`:

```typescript
// src/middleware/logger.middleware.ts
// Middleware para registrar logs das requisições

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.originalUrl}`);
    next(); // Chama o próximo middleware ou o controlador
  }
}
```

Neste exemplo, estamos logando o método HTTP e a URL da requisição. A função `next()` é chamada para passar o controle para o próximo middleware ou controlador.

### Passo 2: Aplicando o Middleware

Agora que o middleware foi criado, você precisa aplicá-lo a uma rota ou a toda a aplicação.

#### Aplicando Middleware a Rotas Específicas

Você pode aplicar o middleware em um módulo específico através da configuração da rota no módulo.

No seu arquivo `app.module.ts`:

```typescript
// src/app.module.ts
// Configurando o middleware para uma rota específica

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('users'); // Aplica o middleware apenas na rota 'users'
  }
}
```

Aqui estamos aplicando o `LoggerMiddleware` apenas à rota `/users`. Para aplicá-lo a múltiplas rotas, basta adicionar outras rotas ao método `forRoutes`.

#### Aplicando Middleware Globalmente

Se quiser que o middleware seja aplicado a todas as rotas da aplicação, use o método `forRoutes('*')`:

```typescript
// src/app.module.ts
// Configurando o middleware para ser aplicado globalmente

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*'); // Aplica o middleware globalmente
  }
}
```

### Middleware Funcional

Outra maneira de criar middleware no NestJS é usando funções simples, sem a necessidade de uma classe. Veja um exemplo de middleware de autenticação funcional:

Crie um arquivo chamado `auth.middleware.ts` no diretório `src/middleware`:

```typescript
// src/middleware/auth.middleware.ts
// Middleware para verificar autenticação

import { Request, Response, NextFunction } from 'express';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers.authorization) {
    return res.status(403).send('Forbidden');
  }
  next();
}
```

Para aplicá-lo, você segue os mesmos passos que no exemplo de classe, usando o nome da função no lugar da classe `LoggerMiddleware`.

## Conclusão

O middleware no NestJS é uma ferramenta poderosa que te permite adicionar camadas de lógica antes de as requisições chegarem ao controlador. Seja para autenticação, logs ou validação, os middlewares são uma forma eficiente de manter o código organizado e modular.

**Até o próximo post!**