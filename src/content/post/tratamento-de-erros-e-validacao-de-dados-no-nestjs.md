---
publishDate: 2024-09-30T12:00:00.000Z
author: Diogo Felizardo
title: Tratamento de Erros e Validação de Dados no NestJS
excerpt: Aprenda a implementar um robusto sistema de tratamento de erros e validação de dados em suas aplicações NestJS para garantir a integridade e a confiabilidade.
image: '~/assets/images/posts/8.jpg'
category: NestJS
tags:
  - Tratamento de Erros
  - Validação de Dados
  - NestJS
metadata:
  canonical: https://diogofelizardo.github.io/tratamento-de-erros-e-validacao-de-dados-no-nestjs
---


## Sumário

1. [Introdução](#introdução)
2. [Validação de Dados](#validação-de-dados)
   - [Instalação das Dependências](#instalação-das-dependências)
   - [Criação de DTOs](#criação-de-dtos)
   - [Uso de Pipes de Validação](#uso-de-pipes-de-validação)
3. [Tratamento de Erros](#tratamento-de-erros)
   - [Filtros de Exceção](#filtros-de-exceção)
4. [Exemplo Prático](#exemplo-prático)
   - [Estrutura do Projeto](#estrutura-do-projeto)
   - [Código Fonte](#código-fonte)
5. [Testando os Erros](#testando-os-erros)
6. [Repositório no GitHub](#repositório-no-github)
7. [Conclusão](#conclusão)
8. [Referências](#referências)


## Introdução

Em aplicações backend, garantir a integridade dos dados e o tratamento adequado de erros é fundamental para a robustez e a confiabilidade do sistema. O NestJS, um framework progressivo para Node.js, oferece ferramentas poderosas para implementar essas funcionalidades de maneira eficiente e escalável.

Neste post, abordaremos como realizar a validação de dados utilizando **DTOs** e **Pipes** do NestJS, além de implementar um sistema de tratamento de erros personalizado utilizando **Filtros de Exceção**.

## Validação de Dados

A validação de dados assegura que as informações recebidas pelas rotas estejam no formato esperado, evitando inconsistências e possíveis vulnerabilidades.

### Instalação das Dependências

Para realizar a validação, utilizaremos as bibliotecas `class-validator` e `class-transformer`. Instale-as executando:

```bash
npm install class-validator class-transformer
```

### Criação de DTOs

**DTOs (Data Transfer Objects)** são classes que definem a estrutura dos dados que serão recebidos ou enviados pela aplicação.

Crie uma pasta chamada `dto` dentro do módulo desejado e adicione o seguinte arquivo:

```typescript
// src/users/dto/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  senha: string;
}
```

### Uso de Pipes de Validação

Os **Pipes** do NestJS são responsáveis por transformar e validar os dados antes que eles cheguem aos manipuladores de rota.

No seu módulo principal ou no módulo específico, habilite a validação global:

```typescript
// src/main.ts
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3000);
}
bootstrap();
```

## Tratamento de Erros

Um tratamento de erros eficaz melhora a experiência do desenvolvedor e do usuário, fornecendo feedback claro e consistente.

### Filtros de Exceção

Para centralizar o tratamento de erros, podemos criar **Filtros de Exceção** personalizados.

```typescript
// src/common/filters/http-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status = exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;

    const message = exception instanceof HttpException
      ? exception.getResponse()
      : 'Erro interno do servidor';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
```

Registre o filtro globalmente:

```typescript
// src/main.ts
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
// ... outros imports

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AllExceptionsFilter());
  // ... restante do bootstrap
}
bootstrap();
```

## Exemplo Prático

Vamos criar um módulo de usuários que implementa validação de dados e tratamento de erros.

### Estrutura do Projeto

```
src/
├── users/
│   ├── dto/
│   │   └── create-user.dto.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── common/
│   └── filters/
│       └── http-exception.filter.ts
├── app.module.ts
└── main.ts
```

### Código Fonte

```typescript
// src/users/users.controller.ts
import { Controller, Post, Body, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // Verifica se o email já está em uso
    const existingUser = await this.usersService.findByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email já está em uso.');
    }

    const user = await this.usersService.create(createUserDto);
    if (!user) {
      throw new BadRequestException('Usuário não criado.');
    }
    return user;
  }
}
```

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users = [];

  create(createUserDto: CreateUserDto) {
    try {
      const user = { id: Date.now(), ...createUserDto };
      this.users.push(user);
      return user;
    } catch (error) {
      return null;
    }
  }

  findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  findAll() {
    return this.users;
  }
}
```

```typescript
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
```

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
```


## Testando os Erros

Vamos simular algumas requisições para verificar como os diferentes erros são tratados.

#### 1. Tentativa de Criar um Usuário com Email Existente

**Requisição:**

```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Primeira Requisição:**

Cria o usuário com sucesso.

**Resposta:**

```json
{
  "id": 1616161616161,
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
```

**Segunda Requisição com o Mesmo Email:**

```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "nome": "Maria Souza",
  "email": "joao@example.com",
  "senha": "senha456"
}
```

**Resposta:**

```json
{
	"statusCode": 409,
	"timestamp": "2024-09-30T13:32:06.715Z",
	"path": "/users",
	"message": {
		"message": "Email já está em uso.",
		"error": "Conflict",
		"statusCode": 409
	}
}
```

#### 2. Tentativa de Criar um Usuário com Dados Inválidos

**Requisição:**

```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "nome": "",
  "email": "invalid-email",
  "senha": "123"
}
```

**Resposta:**

```json
{
  "statusCode": 400,
  "timestamp": "2024-04-27T12:05:00.000Z",
  "path": "/users",
  "message": [
    "nome should not be empty",
    "email must be an email",
    "senha must be longer than or equal to 6 characters"
  ]
}
```

#### 3. Tentativa de Acesso a um Recurso sem Autenticação

**Requisição:**

```http
GET /admin/dashboard HTTP/1.1
```

**Resposta:**

```json
{
  "statusCode": 401,
  "timestamp": "2024-04-27T12:10:00.000Z",
  "path": "/admin/dashboard",
  "message": "Credenciais inválidas."
}
```

#### 4. Acesso Negado a um Recurso Restrito

**Requisição:**

```http
GET /admin/dashboard HTTP/1.1
Authorization: Bearer <token-do-usuário-comum>
```

**Resposta:**

```json
{
  "statusCode": 403,
  "timestamp": "2024-04-27T12:15:00.000Z",
  "path": "/admin/dashboard",
  "message": "Acesso negado."
}
```

#### 5. Erro Interno no Servidor

**Simulação:**

Suponha que haja um erro não tratado dentro do serviço.

**Requisição:**

```http
POST /users HTTP/1.1
Content-Type: application/json

{
  "nome": "Carlos Pereira",
  "email": "carlos@example.com",
  "senha": "senha789"
}
```

**Resposta:**

```json
{
  "statusCode": 500,
  "timestamp": "2024-04-27T12:20:00.000Z",
  "path": "/users",
  "message": "Erro interno do servidor."
}
```

## Conclusão

Implementar um sistema eficaz de tratamento de erros e validação de dados é essencial para o desenvolvimento de aplicações robustas e seguras. O NestJS facilita esse processo com suas ferramentas integradas, como **DTOs**, **Pipes** e **Filtros de Exceção**. Ao seguir as práticas abordadas neste post, você garantirá a integridade dos dados e fornecerá uma melhor experiência para os usuários e desenvolvedores que interagem com sua API.

## Repositório no GitHub

Para acessar o código fonte deste projeto, visite o <a href="https://github.com/diogofelizardo/upload-s3-nestjs" target="_blank" rel="noopener noreferrer">Acesse o Repositório no GitHub</a>.

## Referências

- [Documentação Oficial do NestJS](https://docs.nestjs.com/)
- [class-validator](https://github.com/typestack/class-validator)
- [class-transformer](https://github.com/typestack/class-transformer)