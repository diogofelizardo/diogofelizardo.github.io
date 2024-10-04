---
publishDate: 2023-09-23T19:00:00Z
author: Diogo Felizardo
title: Entendendo Módulos, Controladores e Serviços no NestJS
excerpt: Aprenda como Módulos, Controladores e Serviços no NestJS funcionam para construir aplicações organizadas e escaláveis.
image: '~/assets/images/posts/1.jpg'
category: NestJS
tags:
  - nestjs
  - módulos
  - controladores
  - serviços
metadata:
  canonical: https://diogofelizardo.github.io/entendendo-modulos-controladores-servicos-nestjs
---

Se você está começando com o **NestJS**, provavelmente já percebeu que ele segue uma estrutura bem organizada. Ao desenvolver uma aplicação, três conceitos principais formam a base do framework: **Módulos**, **Controladores** e **Serviços**. Neste post, vamos explorar o que cada um deles faz e como eles se integram para criar uma aplicação escalável e de fácil manutenção.

## O que são Módulos?

No NestJS, **Módulos** são a espinha dorsal da aplicação. Eles organizam o código em blocos independentes e funcionais, facilitando a manutenção e a escalabilidade. Um módulo nada mais é do que uma classe anotada com o decorador `@Module()`. Dentro dele, você declara os componentes que pertencem a ele, como controladores e serviços.

Um módulo básico se parece com isso:

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

Aqui, o `AppModule` é o módulo raiz, que agrupa controladores e serviços. Se você estiver criando uma aplicação maior, pode dividir a lógica em vários módulos, por exemplo, `UserModule`, `AuthModule`, etc.

## O que são Controladores?

Os **Controladores** (Controllers) são responsáveis por lidar com as requisições HTTP e enviar as respostas adequadas. Em termos simples, os controladores são a ponte entre as requisições dos clientes e os serviços que tratam a lógica da aplicação.

Um exemplo de controlador:

```typescript
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
```

Neste exemplo:
- O controlador `AppController` tem uma rota associada com `'app'`.
- Ele usa o serviço `AppService` para buscar dados e retornar a resposta para a rota `GET /app`.

Os controladores mantêm a aplicação organizada ao lidar com o roteamento e delegar a lógica para os serviços.

## O que são Serviços?

**Serviços** são onde a lógica de negócios da sua aplicação é implementada. Eles são classes injetáveis que lidam com as operações reais, como acessar o banco de dados, manipular dados, ou qualquer outra tarefa.

Um exemplo de serviço:

```typescript
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```

- O decorador `@Injectable()` torna essa classe injetável, o que significa que ela pode ser facilmente usada por outros componentes, como controladores.
- Nesse caso, o serviço tem um método simples `getHello()` que retorna uma string, mas você pode adicionar métodos mais complexos para manipular dados, fazer chamadas de APIs externas, etc.

## Como tudo se conecta?

No NestJS, os **Controladores** dependem de **Serviços** para executar a lógica de negócios, e os **Módulos** organizam esses componentes em blocos coesos. Isso torna a aplicação fácil de escalar, testar e manter.

1. O **Controlador** recebe a requisição.
2. Ele delega a lógica para o **Serviço**.
3. O **Serviço** processa a lógica e retorna o resultado.
4. O **Controlador** envia a resposta ao cliente.

Essa separação clara de responsabilidades é uma das razões pelas quais o NestJS é tão poderoso para construir aplicações escaláveis.

## Conclusão

Compreender a estrutura básica de **Módulos**, **Controladores** e **Serviços** no NestJS é fundamental para criar aplicações organizadas e de fácil manutenção. Agora que você conhece esses três conceitos, já pode começar a criar suas APIs de maneira estruturada. Nos próximos posts, veremos como podemos integrar bancos de dados, validação de dados, autenticação e outros tópicos mais avançados para levar sua aplicação ao próximo nível.
