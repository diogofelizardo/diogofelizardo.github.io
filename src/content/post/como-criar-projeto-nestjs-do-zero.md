---
publishDate: 2024-09-25T05:00:00Z
author: Diogo Felizardo
title: Como Criar um Projeto NestJS do Zero
slug: como-criar-projeto-nestjs-do-zero
excerpt: Aprenda a criar um projeto NestJS do zero, entendendo a estrutura de pastas e implementando uma API básica com métodos GET e POST.
image: '~/assets/images/posts/3.jpg'
category: NestJS
tags:
  - nestjs
  - projeto
  - api
  - tutorial
metadata:
  canonical: https://diogofelizardo.github.io/como-criar-projeto-nestjs-do-zero
---

O **NestJS** é um framework Node.js progressivo para construir aplicações server-side eficientes e escaláveis. Inspirado pelo Angular, ele utiliza conceitos como **decorators** e **modularização**, facilitando a criação e manutenção de projetos complexos. Neste tutorial, você aprenderá a criar um projeto NestJS do zero, entenderá a estrutura de pastas e implementará uma API básica com métodos **GET** e **POST**. Vamos lá!

## Sumário

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação do Nest CLI](#instalação-do-nest-cli)
3. [Criando um Novo Projeto NestJS](#criando-um-novo-projeto-nestjs)
4. [Estrutura de Pastas do Projeto](#estrutura-de-pastas-do-projeto)
5. [Implementando uma API Básica](#implementando-uma-api-básica)
   - [Criando o Módulo, Controller e Service](#criando-o-módulo-controller-e-service)
   - [Implementando Endpoints GET e POST](#implementando-endpoints-get-e-post)
6. [Executando e Testando a API](#executando-e-testando-a-api)
7. [Conclusão](#conclusão)

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js) ou **Yarn**
- **Nest CLI** (interface de linha de comando do NestJS)

## Instalação do Nest CLI

O **Nest CLI** facilita a criação e gerenciamento de projetos NestJS. Para instalá-lo globalmente, execute o seguinte comando no terminal:

```bash
npm install -g @nestjs/cli
```

*Ou, se preferir usar o Yarn:*

```bash
yarn global add @nestjs/cli
```

Após a instalação, verifique se o CLI foi instalado corretamente:

```bash
nest --version
```

Você deverá ver a versão instalada do Nest CLI.

## Criando um Novo Projeto NestJS

Com o Nest CLI instalado, podemos criar um novo projeto. Execute o comando abaixo, substituindo `meu-projeto-nest` pelo nome desejado para o seu projeto:

```bash
nest new meu-projeto-nest
```

O CLI solicitará que você escolha o gerenciador de pacotes preferido (**npm** ou **yarn**). Selecione a opção de sua preferência e aguarde a instalação das dependências.

## Estrutura de Pastas do Projeto

Após a criação do projeto, a estrutura básica de pastas será semelhante a esta:

```
meu-projeto-nest/
├── node_modules/
├── src/
│   ├── app.controller.spec.ts
│   ├── app.controller.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── package.json
├── README.md
├── tsconfig.build.json
└── tsconfig.json
```

### Descrição das Pastas e Arquivos Principais

- **node_modules/**: Contém todas as dependências do projeto.
- **src/**: Diretório principal do código-fonte.
  - **main.ts**: Ponto de entrada da aplicação.
  - **app.module.ts**: Módulo raiz da aplicação.
  - **app.controller.ts**: Controller principal.
  - **app.service.ts**: Service principal.
- **test/**: Contém testes automatizados.
- **package.json**: Gerencia as dependências e scripts do projeto.
- **tsconfig.json**: Configurações do TypeScript.

## Implementando uma API Básica

Vamos estender o projeto criado para incluir uma API básica com métodos **GET** e **POST**. Para isso, criaremos um módulo chamado `tasks` que gerenciará tarefas.

### Criando o Módulo, Controller e Service

Use o Nest CLI para gerar um módulo, controller e service para `tasks`:

```bash
cd meu-projeto-nest
nest generate module tasks
nest generate controller tasks
nest generate service tasks
```

Após a execução desses comandos, a estrutura de pastas será atualizada:

```
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── tasks/
    ├── tasks.controller.spec.ts
    ├── tasks.controller.ts
    ├── tasks.module.ts
    └── tasks.service.ts
```

### Implementando Endpoints GET e POST

Vamos implementar dois endpoints:

1. **GET /tasks**: Retorna a lista de tarefas.
2. **POST /tasks**: Cria uma nova tarefa.

#### 1. Definindo o Modelo de Tarefa

Crie um arquivo para definir o modelo de tarefa.

**Caminho:** `src/tasks/task.model.ts`

```typescript
export interface Task {
  id: number;
  title: string;
  description?: string;
}
```

#### 2. Implementando o Service

O service gerenciará a lógica de negócio relacionada às tarefas.

**Caminho:** `src/tasks/tasks.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(title: string, description?: string): Task {
    const task: Task = {
      id: this.idCounter++,
      title,
      description,
    };
    this.tasks.push(task);
    return task;
  }
}
```

#### 3. Implementando o Controller

O controller define os endpoints e utiliza o service para manipular os dados.

**Caminho:** `src/tasks/tasks.controller.ts`

```typescript
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(
    @Body('title') title: string,
    @Body('description') description?: string,
  ): Task {
    return this.tasksService.createTask(title, description);
  }
}
```

#### 4. Atualizando o Módulo

Certifique-se de que o `TasksModule` está importado no módulo raiz (`AppModule`).

**Caminho:** `src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [TasksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

### Visualizando a Estrutura Atualizada

A estrutura de pastas após as modificações:

```
src/
├── app.controller.spec.ts
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── main.ts
└── tasks/
    ├── task.model.ts
    ├── tasks.controller.spec.ts
    ├── tasks.controller.ts
    ├── tasks.module.ts
    └── tasks.service.ts
```

## Executando e Testando a API

Vamos agora executar a aplicação e testar os endpoints **GET** e **POST** utilizando o **Postman** ou **cURL**.

### 1. Iniciando o Servidor

No diretório raiz do projeto, execute:

```bash
npm run start
```

Você deverá ver uma mensagem indicando que a aplicação está rodando em `http://localhost:3000`.

### 2. Testando o Endpoint GET /tasks

Este endpoint retorna a lista de tarefas. Inicialmente, estará vazia.

**Usando cURL:**

```bash
curl -X GET http://localhost:3000/tasks
```

**Resposta Esperada:**

```json
[]
```

**Usando Postman:**

- Abra o Postman.
- Crie uma nova requisição do tipo **GET**.
- Insira a URL: `http://localhost:3000/tasks`.
- Clique em **Send**.
- Você verá uma resposta vazia (`[]`).

### 3. Testando o Endpoint POST /tasks

Este endpoint cria uma nova tarefa. Vamos adicionar uma tarefa para ver como funciona.

**Usando cURL:**

```bash
curl -X POST http://localhost:3000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Minha Primeira Tarefa", "description": "Descrição da tarefa"}'
```

**Resposta Esperada:**

```json
{
  "id": 1,
  "title": "Minha Primeira Tarefa",
  "description": "Descrição da tarefa"
}
```

**Usando Postman:**

- Abra o Postman.
- Crie uma nova requisição do tipo **POST**.
- Insira a URL: `http://localhost:3000/tasks`.
- Na aba **Body**, selecione **raw** e **JSON**.
- Insira o seguinte JSON:

  ```json
  {
    "title": "Minha Primeira Tarefa",
    "description": "Descrição da tarefa"
  }
  ```

- Clique em **Send**.
- Você verá a resposta com os detalhes da tarefa criada.

### 4. Verificando a Lista de Tarefas Atualizada

Após adicionar uma tarefa, vamos verificar se ela aparece na lista.

**Usando cURL:**

```bash
curl -X GET http://localhost:3000/tasks
```

**Resposta Esperada:**

```json
[
  {
    "id": 1,
    "title": "Minha Primeira Tarefa",
    "description": "Descrição da tarefa"
  }
]
```

**Usando Postman:**

- Repita o passo de **GET /tasks**.
- Você verá a lista com a tarefa recém-criada.

## Conclusão

Neste tutorial, você aprendeu a criar um projeto NestJS do zero, compreendeu a estrutura de pastas padrão e implementou uma API básica com métodos **GET** e **POST**. O NestJS, com sua arquitetura modular e uso de decorators, oferece uma maneira eficiente e escalável de desenvolver aplicações backend em Node.js.

Agora que você tem os fundamentos, pode explorar recursos mais avançados do NestJS, como integração com bancos de dados, autenticação, validação de dados e muito mais. Aproveite o poder do NestJS para construir aplicações robustas e de alto desempenho!

Se este tutorial foi útil para você, não esqueça de compartilhar e deixar seu feedback nos comentários!
