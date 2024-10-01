---
publishDate: 2024-10-01T00:00:00.000Z
author: Diogo Felizardo
title: Autenticando Usuários com bcrypt, Passport, JWT e Cookies
excerpt: Aprenda a implementar autenticação segura em sua aplicação NestJS utilizando bcrypt, Passport, JWT e cookies.
image: '~/assets/images/posts/9.jpg'
category: NestJS
tags:
  - autenticação
  - segurança
  - NestJS
metadata:
  canonical: https://seu-blog.com/posts/autenticando-usuarios-com-bcrypt-passport-jwt-e-cookies
---

A segurança é um aspecto crucial no desenvolvimento de aplicações web. Implementar uma autenticação robusta garante que apenas usuários autorizados tenham acesso a recursos sensíveis. Neste post, vamos aprender como autenticar usuários em uma aplicação **NestJS** utilizando **bcrypt** para hash de senhas, **Passport** para estratégias de autenticação, **JWT** para tokens de acesso e **cookies** para gerenciamento de sessões.

## Sumário

1. [Configuração Inicial do Projeto](#configuração-inicial-do-projeto)
2. [Instalação das Dependências](#instalação-das-dependências)
3. [Configuração do bcrypt para Hash de Senhas](#configuração-do-bcrypt-para-hash-de-senhas)
4. [Configuração do Passport com Estratégia JWT](#configuração-do-passport-com-estratégia-jwt)
5. [Gerando e Validando JWTs](#gerando-e-validando-jwts)
6. [Gerenciando Sessões com Cookies](#gerenciando-sessões-com-cookies)
7. [Implementação do Usuário](#implementação-do-usuário)
8. [Configuração do AppModule](#configuração-do-appmodule)
9. [Testando a API](#testando-a-api)
10. [Conclusão](#conclusão)
11. [Repositório no GitHub](#repositório-no-github)

## Configuração Inicial do Projeto

Primeiro, vamos criar uma nova aplicação NestJS:

```bash
npm i -g @nestjs/cli
nest new auth-app
cd auth-app
```

## Instalação das Dependências

Instale as bibliotecas necessárias para autenticação:

```bash
npm install bcrypt passport @nestjs/passport passport-jwt jsonwebtoken cookie-parser
npm install --save-dev @types/passport-jwt
```

## Configuração do bcrypt para Hash de Senhas

O **bcrypt** será usado para criptografar as senhas dos usuários antes de armazená-las no banco de dados.

### Serviço de Autenticação

Crie o serviço de autenticação para lidar com hashing e validação de senhas.

```typescript
// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
```

## Configuração do Passport com Estratégia JWT

**Passport** facilita a implementação de estratégias de autenticação. Vamos configurar a estratégia JWT para proteger nossas rotas.

### Estratégia JWT

Crie a estratégia JWT para extrair e validar o token.

```typescript
// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.jwt,
      ]),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Substitua por uma variável de ambiente em produção
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

### Guard JWT

Crie um guard para proteger as rotas que necessitam de autenticação.

```typescript
// src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

## Gerando e Validando JWTs

Os **JWTs** serão usados para autenticar usuários sem a necessidade de manter sessões no servidor.

### Módulo de Autenticação

Configure o módulo de autenticação para importar os módulos necessários.

```typescript
// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'SECRET_KEY', // Substitua por uma variável de ambiente em produção
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule { }
```

### Controlador de Autenticação

Implemente os endpoints de registro e login.

```typescript
// src/auth/auth.controller.ts
import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res) {
    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const user = await this.usersService.create({ ...createUserDto, password: hashedPassword });
    return res.status(HttpStatus.CREATED).send({ message: 'Usuário registrado com sucesso', user });
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const user = await this.authService.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).send({ message: 'Credenciais inválidas' });
    }
    const token = await this.authService.login(user);
    res.cookie('jwt', token.access_token, { httpOnly: true });
    return res.send({ message: 'Login realizado com sucesso' });
  }
}
```

### DTOs

Defina os Data Transfer Objects (DTOs) para garantir a validação dos dados de entrada.

```typescript
// src/auth/dto/create-user.dto.ts
export class CreateUserDto {
  username: string;
  password: string;
}
```

```typescript
// src/auth/dto/login.dto.ts
export class LoginDto {
  username: string;
  password: string;
}
```

## Gerenciando Sessões com Cookies

Utilizar **cookies** permite armazenar tokens de forma segura no cliente, facilitando a gestão de sessões.

### Configuração do Middleware

Adicione o middleware `cookie-parser` para lidar com cookies nas requisições.

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  await app.listen(3000);
}
bootstrap();
```
## Implementação do Usuário

Para gerenciar os usuários, precisamos de um serviço que lide com as operações relacionadas. A seguir, implementamos o `UsersService`.

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../auth/dto/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(user);
    return user;
  }
}
```

### Módulo de Usuários

Configure o módulo de usuários para exportar o `UsersService`.

```typescript
// src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
```

### Controlador de Usuários

Crie um controlador para gerenciar rotas protegidas.

```typescript
// src/users/users.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
```


## Configuração do AppModule

O **AppModule** é o módulo raiz da aplicação NestJS. Aqui, importamos os módulos de autenticação e usuários para que possam ser utilizados em toda a aplicação.

```typescript
// src/app.module.ts
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

## Testando a API

Após configurar a autenticação, vamos testar os endpoints utilizando ferramentas como **Postman** ou **cURL**.

### 1. Registro de Usuário

**Requisição:**

```http
POST /auth/register
Content-Type: application/json

{
  "username": "diogo",
  "password": "senhaSegura123"
}
```

**Resposta:**

```json
{
  "message": "Usuário registrado com sucesso",
  "user": {
    "id": 1,
    "username": "diogo",
    "password": "$2b$10$..."
  }
}
```

### 2. Login

**Requisição:**

```http
POST /auth/login
Content-Type: application/json

{
  "username": "diogo",
  "password": "senhaSegura123"
}
```

**Resposta:**

```json
{
  "message": "Login realizado com sucesso"
}
```

**Cookie:**

```
Set-Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6...; HttpOnly
```

### 3. Acessando uma Rota Protegida

**Requisição:**

```http
GET /users/profile
Cookie: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6...
```

**Resposta:**

```json
{
  "userId": 1,
  "username": "diogo"
}
```

## Conclusão

Implementar uma autenticação segura é essencial para proteger sua aplicação contra acessos não autorizados. Utilizando **bcrypt** para hashing de senhas, **Passport** para estratégias de autenticação, **JWT** para tokens de acesso e **cookies** para gerenciamento de sessões, conseguimos criar um sistema robusto e eficiente em **NestJS**. Este guia fornece uma base sólida para expandir e adaptar a autenticação conforme as necessidades da sua aplicação.

## Repositório no GitHub

Acesse o código completo deste projeto no [GitHub](https://github.com/diogofelizardo/autenticando-usuarios-no-nestjs).
