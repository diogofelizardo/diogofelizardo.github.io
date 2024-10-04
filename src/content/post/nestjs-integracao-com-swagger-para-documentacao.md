---
publishDate: 2024-10-04T12:00:00.000Z
author: Diogo Felizardo
title: 'NestJs: Integração com Swagger para Documentação'
excerpt: Aprenda como integrar o Swagger em seu projeto NestJS para criar uma documentação interativa e eficiente.
image: '~/assets/images/posts/12.jpg'
category: NestJS
tags:
  - Swagger
  - Documentação
  - NestJS
metadata:
  canonical: https://seu-blog.com/posts/nestjs-integracao-com-swagger-para-documentacao
---

## Sumário

- [Introdução](#introdução)
- [Pré-requisitos](#pré-requisitos)
- [Instalação das Dependências](#instalação-das-dependências)
- [Configuração do Swagger no NestJS](#configuração-do-swagger-no-nestjs)
- [Criando DTOs para Documentação](#criando-dtos-para-documentação)
- [Criando o Service de Usuários](#criando-o-service-de-usuários)
- [Exemplos de Uso](#exemplos-de-uso)
- [Capturas de Tela](#capturas-de-tela)
- [Link para o Repositório GitHub](#link-para-o-repositório-github)
- [Referências](#referências)
- [Conclusão](#conclusão)

## Introdução

O Swagger é uma ferramenta poderosa para gerar documentação interativa para APIs RESTful. Integrá-lo com NestJS facilita a criação de documentação que é automaticamente atualizada conforme o desenvolvimento do projeto avança.

## Pré-requisitos

Antes de começar, certifique-se de ter:

- Node.js instalado
- NestJS CLI instalado
- Um projeto NestJS já criado

## Instalação das Dependências

Para integrar o Swagger, precisamos instalar algumas bibliotecas adicionais. Execute o seguinte comando no terminal:

```bash
npm install --save @nestjs/swagger swagger-ui-express
```

## Configuração do Swagger no NestJS

Vamos configurar o Swagger no nosso projeto NestJS.

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Exemplo')
    .setDescription('Documentação da API de Exemplo com Swagger')
    .setVersion('1.0')
    .addTag('exemplo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
```

- **DocumentBuilder**: Utilizado para configurar as informações básicas da documentação.
- **SwaggerModule.createDocument**: Gera a documentação com base nas configurações e nos módulos do NestJS.
- **SwaggerModule.setup**: Define a rota onde a documentação será acessível (`/api-docs`).

## Criando DTOs para Documentação

Os DTOs (Data Transfer Objects) são utilizados para definir a forma dos dados que serão enviados e recebidos pela API. O Swagger utiliza essas definições para gerar a documentação.

```typescript
// src/users/dto/create-user.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nome completo do usuário',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'joao.silva@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  password: string;
}
```

- **@ApiProperty**: Decorador utilizado para descrever as propriedades do DTO, facilitando a geração da documentação pelo Swagger.


## Criando o Service de Usuários

Para uma estrutura mais organizada e separação de responsabilidades, vamos criar um **Service** para gerenciar a lógica de negócios relacionada aos usuários.

### Passo 1: Gerar o Service

Utilize o NestJS CLI para gerar o service:

```bash
nest generate service users
```

### Passo 2: Implementar o Service

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  create(createUserDto: CreateUserDto): CreateUserDto {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll(): CreateUserDto[] {
    return this.users;
  }
}
```


## Configurando o Módulo Principal

Para garantir que o **UsersModule** esteja corretamente integrado ao seu projeto, é necessário configurar o módulo principal (`AppModule`) para importar o módulo de usuários.

### Passo 1: Atualizar o AppModule

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

### Passo 2: Verificar a Estrutura do UsersModule

Certifique-se de que o `UsersModule` está devidamente configurado como no exemplo abaixo.

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

## Exemplos de Uso

Vamos criar um controller de usuários que utiliza os DTOs definidos.

```typescript
// src/users/users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso.', type: CreateUserDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.', type: [CreateUserDto] })
  findAll() {
    return this.usersService.findAll();
  }
}
```

- **@ApiTags**: Agrupa as rotas relacionadas para melhor organização na documentação.
- **@ApiOperation**: Descreve a operação da rota.
- **@ApiResponse**: Detalha as possíveis respostas da rota.

## Capturas de Tela

Após configurar o Swagger, inicie o servidor e acesse `http://localhost:3000/api-docs` para visualizar a documentação interativa.

![Swagger UI](~/assets/images/posts/12/swagger.png)

## Link para o Repositório GitHub

Você pode acessar o repositório completo deste projeto [aqui](https://github.com/diogofelizardo/nestjs-integracao-com-swagger-para-documentacao).

## Referências

- [NestJS Swagger Documentation](https://docs.nestjs.com/openapi/introduction)
- [Swagger Official Website](https://swagger.io/)

## Conclusão

Integrar o Swagger com NestJS é uma maneira eficaz de criar documentação interativa para suas APIs. Neste post, aprendemos a instalar as dependências necessárias, configurar o Swagger, criar DTOs para uma melhor descrição dos dados e estruturar nossos controllers para que a documentação seja gerada automaticamente. A documentação clara e atualizada facilita a manutenção do projeto e a colaboração entre desenvolvedores. Como próximos passos, você pode explorar mais funcionalidades do Swagger, como autenticação, versionamento de APIs e personalizações avançadas.

