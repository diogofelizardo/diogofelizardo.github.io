---
publishDate: 2024-09-26T05:00:00Z
author: Diogo Felizardo
title: 'Nestjs: Configurando um Banco de Dados PostgreSQL com TypeORM' 
slug: nestjs-configurando-banco-dados-postgresql-com-typeorm
excerpt: Aprenda a configurar um banco de dados PostgreSQL em uma aplicação NestJS usando o TypeORM, incluindo a criação de entidades, controllers e services.
image: '~/assets/images/posts/4.jpg' 
category: NestJS 
tags:
- nestjs
- typeorm
- postgresql
- banco de dados
- tutorial 
metadata: 
  canonical: https://diogofelizardo.github.io/blog/nestjs-configurando-banco-dados-postgresql-com-typeorm
---

Neste post, vamos explorar como configurar um banco de dados PostgreSQL em uma aplicação NestJS utilizando o TypeORM. Vamos abordar desde a instalação das dependências necessárias até a criação de entidades e a conexão com o banco de dados.

## Sumário

1. [Introdução](#introdução)
2. [Requisitos](#requisitos)
3. [Instalando Dependências](#instalando-dependências)
4. [Configurando o TypeORM](#configurando-o-typeorm)
5. [Criando Entidades](#criando-entidades)
6. [Criando Módulos e Serviços](#criando-módulos-e-serviços)
7. [Executando a Aplicação](#executando-a-aplicação)
8. [Conclusão](#conclusão)

## Introdução

O NestJS é um framework progressivo para construção de aplicações Node.js eficientes e escaláveis. Integrar um banco de dados é uma etapa fundamental para muitas aplicações, e o TypeORM facilita essa integração com uma abordagem baseada em decorators e classes.

Neste tutorial, iremos configurar um banco de dados PostgreSQL utilizando o TypeORM no NestJS, criando entidades, repositórios e serviços para interagir com o banco de dados.

## Requisitos

Antes de começar, certifique-se de ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [Nest CLI](https://docs.nestjs.com/cli/overview) (`npm install -g @nestjs/cli`)
- [PostgreSQL](https://www.postgresql.org/) (instalado e em execução)

## Instalando Dependências

Primeiro, crie um novo projeto NestJS ou utilize um existente. Para criar um novo projeto, execute:

```bash
nest new meu-projeto
```

Navegue até o diretório do projeto:

```bash
cd meu-projeto
```

Instale as dependências necessárias para integrar o TypeORM com o PostgreSQL:

```bash
npm install --save @nestjs/typeorm typeorm pg
```

## Configurando o TypeORM

Crie um arquivo de configuração para o TypeORM em `src/ormconfig.ts`:

```typescript
// src/ormconfig.ts

import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from './users/user.entity';

const config: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'seu_usuario',
  password: 'sua_senha',
  database: 'nome_do_banco',
  entities: [User],
  synchronize: true,
};

export default config;
```

**Nota:** A opção `synchronize: true` é útil para desenvolvimento, mas deve ser desativada em produção para evitar perda de dados.

Em seguida, importe a configuração no módulo principal `AppModule`:

```typescript
// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './ormconfig';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Criando Entidades

As entidades representam as tabelas no banco de dados. Vamos criar uma entidade de exemplo chamada `User`.

Crie o diretório `users` dentro de `src`:

```bash
mkdir src/users
```

Crie o arquivo da entidade em `src/users/user.entity.ts`:

```typescript
// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;
}
```

## Criando Módulos e Serviços

Para organizar melhor o código, vamos criar um módulo de usuários que inclui um serviço e um controlador.

### Módulo de Usuários

Crie o módulo de usuários:

```bash
nest generate module users
```

### Serviço de Usuários

Crie o serviço de usuários:

```bash
nest generate service users
```

Edite o serviço em `src/users/users.service.ts`:

```typescript
// src/users/users.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

  create(user: Partial<User>): Promise<User> {
    const newUser = this.usersRepository.create(user);
    return this.usersRepository.save(newUser);
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
```

### Controlador de Usuários

Crie o controlador de usuários:

```bash
nest generate controller users
```

Edite o controlador em `src/users/users.controller.ts`:

```typescript
// src/users/users.controller.ts

import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post()
  create(@Body() user: Partial<User>): Promise<User> {
    return this.usersService.create(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }
}
```

### Atualizando o Módulo de Usuários

Edite o módulo de usuários em `src/users/users.module.ts` para importar o TypeORM e registrar a entidade:

```typescript
// src/users/users.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```

## Executando a Aplicação

Certifique-se de que o PostgreSQL está em execução e que as credenciais fornecidas na configuração estão corretas.

Inicie a aplicação NestJS:

```bash
npm run start
```

A aplicação estará disponível em `http://localhost:3000`. Você pode testar os endpoints de usuários utilizando ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

### Exemplos de Endpoints

- **GET** `/users` - Retorna todos os usuários.
- **GET** `/users/:id` - Retorna um usuário pelo ID.
- **POST** `/users` - Cria um novo usuário.
- **DELETE** `/users/:id` - Remove um usuário pelo ID.

## Conclusão

Neste tutorial, configuramos uma aplicação NestJS para utilizar um banco de dados PostgreSQL com TypeORM. Criamos uma entidade `User`, um módulo de usuários, serviços e controladores para gerenciar os dados. Com essa base, você pode expandir sua aplicação adicionando mais entidades e funcionalidades conforme necessário.

TypeORM oferece uma poderosa abstração para interagir com o banco de dados, facilitando operações CRUD e mantendo seu código organizado e sustentável. Aproveite para explorar mais recursos do TypeORM e do NestJS para aprimorar ainda mais sua aplicação!