---
publishDate: 2024-09-29T12:00:00.000Z
author: Diogo Felizardo
title: Logging no NestJs
excerpt: Aprenda a implementar e customizar o sistema de logs no NestJs para melhorar a manutenção e monitoramento de aplicações.
image: '~/assets/images/posts/7.jpg'
category: NestJS
tags:
  - Logging
  - NestJS
  - Desenvolvimento Backend
metadata:
  canonical: https://diogofelizardo.github.io/blog/logging-no-nestjs
---

O **logging** é uma parte essencial no desenvolvimento de aplicações backend, permitindo monitorar o comportamento do sistema, diagnosticar problemas e manter registros de eventos importantes. Neste post, exploraremos como implementar e customizar o sistema de logs no **NestJs**, um framework Node.js progressivo para construção de aplicações eficientes e escaláveis.

## Sumário

- [Introdução](#introdução)
- [Configurando o Logger no NestJs](#configurando-o-logger-no-nestjs)
- [Níveis de Log](#níveis-de-log)
- [Customizando o Logger](#customizando-o-logger)
- [Usando Interceptadores para Logging](#usando-interceptadores-para-logging)
- [Exemplo Prático](#exemplo-prático)
  - [Estrutura do Projeto](#estrutura-do-projeto)
  - [Implementação](#implementação)
    - [Instalando class-validator e class-transformer](#instalando-class-validator-e-class-transformer)
    - [src/cats/dto/create-cat.dto.ts](#srccatsdtocreate-cat.dtsts)
    - [src/cats/cats.service.ts](#srccatscats.servicets)
    - [src/cats/cats.controller.ts](#srccatscats.controllerts)
    - [src/logging.interceptor.ts](#srclogginginterceptorts)
    - [src/app.module.ts](#srcapp.modulets)
    - [src/main.ts](#srcmaints)
- [Repositório no GitHub](#repositório-no-github)
- [Conclusão](#conclusão)
- [Referências](#referências)

## Introdução

O NestJs fornece uma implementação de **Logger** que facilita a criação de logs estruturados e consistentes em sua aplicação. Com ele, é possível registrar informações importantes durante o ciclo de vida da aplicação, como inicialização de módulos, requisições HTTP, erros e muito mais.

## Configurando o Logger no NestJs

Por padrão, o NestJs já vem com um sistema de logging básico. Para utilizá-lo, basta injetar o serviço `Logger` em seus componentes.

### Exemplo Básico

```typescript
// src/app.service.ts
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger(AppService.name);

  getHello(): string {
    this.logger.log('getHello foi chamado');
    return 'Hello World!';
  }
}
```

Neste exemplo, criamos uma instância do `Logger` e utilizamos o método `log` para registrar uma mensagem sempre que o método `getHello` for chamado.

## Níveis de Log

O sistema de logging do NestJs suporta diferentes níveis de log, permitindo categorizar as mensagens de acordo com sua importância:

- **Log**: Informações gerais sobre o funcionamento da aplicação.
- **Error**: Erros que ocorrem durante a execução.
- **Warn**: Avisos sobre situações que podem precisar de atenção.
- **Debug**: Informações detalhadas para depuração.
- **Verbose**: Logs muito detalhados para análise aprofundada.

### Utilizando Diferentes Níveis

```typescript
this.logger.log('Mensagem de log');
this.logger.error('Mensagem de erro');
this.logger.warn('Mensagem de aviso');
this.logger.debug('Mensagem de debug');
this.logger.verbose('Mensagem verbose');
```

## Customizando o Logger

Para atender a necessidades específicas, é possível criar uma implementação customizada do Logger. Isso permite, por exemplo, enviar logs para serviços externos, formatar mensagens de maneira diferente ou alterar o comportamento padrão.

### Criando um Logger Customizado

```typescript
// src/custom-logger.service.ts
import { LoggerService, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  log(message: string) {
    // Implementação personalizada
    console.log(`[CUSTOM LOG]: ${message}`);
  }

  error(message: string, trace: string) {
    // Implementação personalizada
    console.error(`[CUSTOM ERROR]: ${message} - Trace: ${trace}`);
  }

  warn(message: string) {
    // Implementação personalizada
    console.warn(`[CUSTOM WARN]: ${message}`);
  }

  debug(message: string) {
    // Implementação personalizada
    console.debug(`[CUSTOM DEBUG]: ${message}`);
  }

  verbose(message: string) {
    // Implementação personalizada
    console.info(`[CUSTOM VERBOSE]: ${message}`);
  }
}
```

### Integrando o Logger Customizado

Para utilizar o `CustomLogger`, basta configurá-lo no bootstrap da aplicação:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomLogger } from './custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  await app.listen(3000);
}
bootstrap();
```

## Usando Interceptadores para Logging

Interceptadores são uma poderosa funcionalidade do NestJs que permite interceptar chamadas de métodos e aplicar lógica adicional. Podemos utilizá-los para implementar logging de requisições e respostas de forma centralizada.

### Criando um Interceptador de Logging

```typescript
// src/logging.interceptor.ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url } = req;

    this.logger.log(`Incoming Request: ${method} ${url}`);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(`Outgoing Response: ${method} ${url} - ${Date.now() - now}ms`),
        ),
      );
  }
}
```

### Registrando o Interceptador Globalmente

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { CustomLogger } from './custom-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
```

Com isso, todas as requisições HTTP serão logadas automaticamente, tanto na entrada quanto na saída.

## Exemplo Prático

Vamos criar uma aplicação simples que utiliza logging para monitorar operações CRUD em um recurso chamado `Cats`.

### Estrutura do Projeto

```
src/
├── cats/
│   ├── cats.controller.ts
│   ├── cats.service.ts
│   └── dto/
│       └── create-cat.dto.ts
├── custom-logger.service.ts
├── logging.interceptor.ts
├── main.ts
└── app.module.ts
```

### Implementação

#### Instalando class-validator e class-transformer

Para utilizar validações nos DTOs, é necessário instalar as dependências `class-validator` e `class-transformer`. Execute o seguinte comando no terminal:

```bash
npm install class-validator class-transformer
```

Em seguida, configure o `ValidationPipe` globalmente na aplicação para habilitar a validação automática dos DTOs:

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './logging.interceptor';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new CustomLogger(),
  });
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

#### src/cats/dto/create-cat.dto.ts

Este arquivo define o DTO para criar um novo gato, incluindo validações para garantir que os dados recebidos sejam válidos.

```typescript
// src/cats/dto/create-cat.dto.ts
import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateCatDto {
  @IsString()
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsOptional()
  @IsString()
  readonly breed?: string;
}
```

**Explicação:**

- **@IsString()**: Garante que o campo seja uma string.
- **@IsInt()**: Garante que o campo seja um número inteiro.
- **@IsOptional()**: Indica que o campo é opcional.
  
Essas validações ajudam a prevenir que dados inválidos cheguem aos serviços da aplicação, melhorando a robustez e a segurança.

#### src/cats/cats.service.ts

```typescript
// src/cats/cats.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly logger = new Logger(CatsService.name);
  private readonly cats = [];

  create(createCatDto: CreateCatDto) {
    this.cats.push(createCatDto);
    this.logger.log(`Criado um novo gato: ${JSON.stringify(createCatDto)}`);
  }

  findAll() {
    this.logger.log('Retornando todos os gatos');
    return this.cats;
  }
}
```

#### src/cats/cats.controller.ts

```typescript
// src/cats/cats.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return 'Gato criado com sucesso!';
  }

  @Get()
  findAll() {
    return this.catsService.findAll();
  }
}
```

Com essa configuração, ao criar ou buscar gatos, as operações serão logadas, facilitando o monitoramento e a depuração da aplicação. Além disso, as validações asseguram que os dados recebidos estejam no formato correto, aumentando a confiabilidade da aplicação.

## Repositório no GitHub

Para acessar o código fonte deste projeto, visite o <a href="https://github.com/diogofelizardo/logging-no-nestjs" target="_blank" rel="noopener noreferrer">Acesse o Repositório no GitHub</a>.


## Conclusão

Implementar um sistema de logging eficaz no NestJs é fundamental para manter a saúde e a performance de sua aplicação. O NestJs oferece ferramentas robustas e flexíveis para criar logs personalizados, permitindo que você adapte o sistema de acordo com as necessidades específicas do seu projeto. Ao seguir as práticas apresentadas neste post, você estará melhor equipado para monitorar, diagnosticar e manter sua aplicação NestJs de maneira eficiente.

# Referências

- [Documentação Oficial do NestJs - Logging](https://docs.nestjs.com/techniques/logger)
- [NestJs Interceptors](https://docs.nestjs.com/interceptors)
- [Melhores Práticas de Logging](https://blog.risingstack.com/node-js-logging-tutorial/)
- [Class Validator](https://github.com/typestack/class-validator)