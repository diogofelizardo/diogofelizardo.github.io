---
publishDate: 2024-10-03T00:00:00.000Z
author: Diogo Felizardo
title: 'NestJS: Arquitetura Event-Driven'
excerpt: Aprenda a implementar uma arquitetura orientada a eventos utilizando NestJS.
image: '~/assets/images/posts/11.jpg'
category: NestJS
tags:
  - NestJS
  - Event-Driven
  - Arquitetura de Software
metadata:
  canonical: https://diogofelizardo.github.io/nestjs-arquitetura-event-driven
---

## Sumário

- [Introdução](#introdução)
- [Dependências](#dependências)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Configuração do NestJS](#configuração-do-nestjs)
- [Implementação de Eventos](#implementação-de-eventos)
- [Implementação de Handlers](#implementação-de-handlers)
- [Uso de DTOs](#uso-de-dtos)
- [Implementação do Módulo de Usuários](#implementação-do-módulo-de-usuários)
- [Implementação do Serviço de Usuários](#implementação-do-serviço-de-usuários)
- [Implementação do Controller de Usuários](#implementação-do-controller-de-usuários)
- [Testando o Projeto](#testando-o-projeto)
- [Exemplos de Resultados](#exemplos-de-resultados)
- [Links Úteis](#links-úteis)
- [Referências](#referências)
- [Repositório no GitHub](#repositório-no-github)
- [Conclusão](#conclusão)

## Introdução

A arquitetura orientada a eventos (Event-Driven Architecture) promove o desacoplamento entre componentes de um sistema, permitindo que eventos desencadeiem ações em diferentes partes da aplicação. Neste post, vamos implementar uma arquitetura event-driven utilizando NestJS, um framework Node.js progressivo para construção de aplicações eficientes e escaláveis.

## Dependências

Vamos iniciar criando um novo projeto NestJS e instalando as dependências necessárias.

### Passos de Instalação

```bash
# Instalar o NestJS CLI globalmente, se ainda não tiver
npm install -g @nestjs/cli

# Criar um novo projeto NestJS
nest new nestjs-event-driven

# Acesse o diretório do projeto
cd nestjs-event-driven

# Instalar as bibliotecas necessárias
npm install @nestjs/event-emitter @nestjs/cqrs rxjs uuid
npm install --save-dev @types/uuid
```

## Estrutura do Projeto

A estrutura básica do projeto será a seguinte:

```
src/
├── app.module.ts
├── events/
│   ├── events.module.ts
│   ├── user-created.event.ts
│   └── user-created.handler.ts
├── users/
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
│       └── create-user.dto.ts
├── main.ts
```

## Configuração do NestJS

Primeiro, configuramos o módulo principal da aplicação para incluir o `EventEmitterModule`.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
  ],
})
export class AppModule {}
```

## Implementação de Eventos

Vamos definir um evento chamado `UserCreatedEvent` que será emitido quando um novo usuário for criado.

```typescript
// src/events/user-created.event.ts
export class UserCreatedEvent {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
}
```

## Implementação de Handlers

Criamos um handler para o evento `UserCreatedEvent` que realizará ações quando o evento for disparado, como enviar um email de boas-vindas.

```typescript
// src/events/user-created.handler.ts
import { IEventHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './user-created.event';

@Injectable()
export class UserCreatedHandler {
  @OnEvent('user.created')
  handleUserCreatedEvent(event: UserCreatedEvent) implements IEventHandler<UserCreatedEvent> {
    // Lógica para enviar email de boas-vindas
    console.log(`Enviar email para ${event.email}`);
  }
}
```

## Uso de DTOs

Criamos um Data Transfer Object (DTO) para a criação de usuários.

```typescript
// src/users/dto/create-user.dto.ts
export class CreateUserDto {
  readonly name: string;
  readonly email: string;
}
```

## Implementação do Módulo de Eventos

Configuramos o módulo de eventos para fornecer o handler.

```typescript
// src/events/events.module.ts
import { Module } from '@nestjs/common';
import { UserCreatedHandler } from './user-created.handler';

@Module({
  providers: [UserCreatedHandler],
})
export class EventsModule {}
```

## Implementação do Módulo de Usuários

Configuramos o módulo de usuários para utilizar o `EventsModule`.

```typescript
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [EventsModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

## Implementação do Serviço de Usuários

O serviço de usuários será responsável por criar novos usuários e emitir o evento correspondente.

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedEvent } from '../events/user-created.event';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersService {
  private users = [];

  constructor(private eventEmitter: EventEmitter2) {}

  create(createUserDto: CreateUserDto) {
    const user = {
      id: uuidv4(),
      ...createUserDto,
    };
    this.users.push(user);
    this.eventEmitter.emit('user.created', new UserCreatedEvent(user.id, user.name, user.email));
    return user;
  }

  findAll() {
    return this.users;
  }
}
```

## Implementação do Controller de Usuários

O controller gerenciará as rotas para criar e listar usuários.

```typescript
// src/users/users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
```

## Testando o Projeto

Inicie a aplicação:

```bash
npm run start
```

### Criando um Usuário

Envie uma requisição POST para `http://localhost:3000/users` com o seguinte corpo:

```json
{
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

### Listando Usuários

Envie uma requisição GET para `http://localhost:3000/users` para listar todos os usuários cadastrados.

## Exemplos de Resultados

Após criar um usuário, o terminal exibirá:

```
Enviar email para joao.silva@example.com
```

A resposta da API para a criação do usuário será:

```json
{
  "id": "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
  "name": "João Silva",
  "email": "joao.silva@example.com"
}
```

## Links Úteis

- [Documentação do NestJS](https://nestjs.com/)
- [NestJS Event Emitter](https://github.com/nestjs/event-emitter)
- [RxJS](https://rxjs.dev/)
- [UUID](https://www.npmjs.com/package/uuid)

## Referências

- [NestJS Documentation - Event Emitter](https://docs.nestjs.com/events)
- [Designing Event-Driven Systems](https://martinfowler.com/articles/201701-event-driven.html)
- [Understanding Event-Driven Architecture](https://aws.amazon.com/event-driven-architecture/)

## Repositório no GitHub

Você pode acessar o código completo deste projeto no [GitHub](https://github.com/diogofelizardo/nestjs-arquitetura-event-driven).

## Conclusão

Implementar uma arquitetura orientada a eventos com NestJS utilizando o `@nestjs/event-emitter` permite criar aplicações mais flexíveis e escaláveis. Ao desacoplar os componentes através de eventos, facilitamos a manutenção e a adição de novas funcionalidades sem impactar outras partes do sistema. Este guia apresentou um exemplo prático de como emitir e escutar eventos, criando um fluxo simples para criação de usuários e ações subsequentes, como o envio de emails de boas-vindas.

Com a estrutura apresentada, você pode expandir a aplicação para incluir mais eventos e handlers conforme a complexidade do seu projeto aumenta. Além disso, a utilização de DTOs assegura a validação e a consistência dos dados transferidos entre as camadas da aplicação.

Encorage-se a explorar outras funcionalidades do NestJS e integrar padrões de design adicionais para aprimorar ainda mais a arquitetura do seu sistema. A adoção de práticas orientadas a eventos é um passo significativo rumo ao desenvolvimento de aplicações robustas e preparadas para crescer de maneira sustentável.