---
publishDate: 2024-10-02T12:00:00Z
author: Diogo Felizardo
title: 'NestJs: Chat em Tempo Real com WebSockets'
excerpt: Aprenda a criar um chat em tempo real utilizando NestJs e WebSockets, implementando uma aplicação robusta e escalável.
image: '~/assets/images/posts/10.jpg'
category: NestJS
tags:
  - NestJS
  - WebSockets
  - Chat
metadata:
  canonical: https://seu-blog.com/posts/nestjs-chat-em-tempo-real-com-websockets
---

Criar aplicações em tempo real tornou-se essencial nos dias de hoje, e o NestJs, com seu suporte a WebSockets, facilita a implementação de funcionalidades como chats em tempo real. Neste tutorial, vamos construir um chat simples utilizando NestJs e WebSockets, passo a passo.

## Sumário

1. [Introdução](#introdução)
2. [Pré-requisitos](#pré-requisitos)
3. [Configuração do Projeto](#configuração-do-projeto)
4. [Instalação das Bibliotecas Necessárias](#instalação-das-bibliotecas-necessárias)
5. [Criação do Módulo de Chat](#criação-do-módulo-de-chat)
6. [Implementação dos Serviços e Gateways](#implementação-dos-serviços-e-gateways)
7. [Definição dos DTOs](#definição-dos-dtos)
8. [Configuração do Cliente](#configuração-do-cliente)
9. [Execução do Projeto](#execução-do-projeto)
10. [Resultados Esperados](#resultados-esperados)
11. [Conclusão](#conclusão)
12. [Repositório no GitHub](#repositório-no-github)

## Introdução

O NestJs é um framework progressivo para construir aplicações Node.js eficientes e escaláveis. Neste post, vamos criar um chat em tempo real utilizando **WebSockets**, uma tecnologia que permite comunicação bidirecional entre cliente e servidor. Ao final deste tutorial, você terá uma aplicação funcional de chat em tempo real.

## Pré-requisitos

Antes de começar, certifique-se de ter:

- **Node.js** instalado (versão 14 ou superior)
- **npm** ou **yarn** como gerenciador de pacotes
- Conhecimentos básicos em **TypeScript** e **NestJs**

## Configuração do Projeto

Primeiro, vamos criar um novo projeto NestJs.

```bash
npm i -g @nestjs/cli
nest new nestjs-chat
cd nestjs-chat
```

## Instalação das Bibliotecas Necessárias

Para implementar WebSockets no NestJs, precisamos instalar o pacote `@nestjs/websockets` e o adaptador `socket.io`.

```bash
npm install @nestjs/websockets @nestjs/platform-socket.io socket.io
```

## Criação do Módulo de Chat

Vamos criar um módulo dedicado para o chat.

```bash
nest generate module chat
```

## Implementação dos Serviços e Gateways

### Criação do Gateway de Chat

O gateway é responsável por gerenciar as conexões WebSocket.

```bash
nest generate gateway chat
```

```typescript
// src/chat/chat.gateway.ts
import { 
  WebSocketGateway, 
  WebSocketServer, 
  SubscribeMessage, 
  OnGatewayInit, 
  OnGatewayConnection, 
  OnGatewayDisconnect 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/create-message.dto';

@WebSocketGateway()
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  @WebSocketServer() server: Server;

  constructor(private readonly chatService: ChatService) {}

  afterInit(server: Server) {
    console.log('WebSocket server initialized');
  }

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: CreateMessageDto): void {
    this.chatService.createMessage(payload);
    this.server.emit('message', payload);
  }
}
```

### Criação do Serviço de Chat

O serviço irá gerenciar as mensagens.

```bash
nest generate service chat
```

```typescript
// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class ChatService {
  private messages: CreateMessageDto[] = [];

  createMessage(message: CreateMessageDto) {
    this.messages.push(message);
  }

  getAllMessages(): CreateMessageDto[] {
    return this.messages;
  }
}
```

## Definição dos DTOs

Os DTOs (Data Transfer Objects) ajudam a definir a estrutura dos dados.

```bash
mkdir src/chat/dto
```

```typescript
// src/chat/dto/create-message.dto.ts
export class CreateMessageDto {
  username: string;
  message: string;
}
```

## Configuração do Cliente

Para testar o chat, vamos criar um simples cliente HTML.

Crie uma pasta `public` na raiz do projeto e adicione um arquivo `index.html`.

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Chat em Tempo Real</title>
  <script src="/socket.io/socket.io.js"></script>
</head>
<body>
  <h1>Chat em Tempo Real com NestJs</h1>
  <div id="chat">
    <ul id="messages"></ul>
  </div>
  <input id="username" placeholder="Nome de usuário" />
  <input id="message" placeholder="Mensagem" />
  <button onclick="sendMessage()">Enviar</button>

  <script>
    const socket = io();

    socket.on('message', function(msg) {
      const item = document.createElement('li');
      item.textContent = msg.username + ': ' + msg.message;
      document.getElementById('messages').appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    });

    function sendMessage() {
      const username = document.getElementById('username').value;
      const message = document.getElementById('message').value;
      socket.emit('message', { username, message });
      document.getElementById('message').value = '';
    }
  </script>
</body>
</html>
```

Atualize o `main.ts` para servir arquivos estáticos.

```typescript
// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  await app.listen(3000);
  console.log('Application is running on: http://localhost:3000');
}
bootstrap();
```

## Execução do Projeto

Inicie o servidor:

```bash
npm run start:dev
```

Abra o navegador e acesse `http://localhost:3000`. Abra várias abas ou dispositivos para testar o chat em tempo real.

## Resultados Esperados

Ao seguir os passos acima, você terá uma aplicação de chat funcional onde múltiplos usuários podem enviar e receber mensagens em tempo real. As mensagens serão exibidas instantaneamente em todas as instâncias conectadas.

![Exemplo do Chat em Tempo Real](~/assets/images/posts/10/chat.png)

## Conclusão

Neste tutorial, construímos um chat em tempo real utilizando NestJs e WebSockets. Essa abordagem é escalável e eficiente para aplicações que requerem comunicação instantânea entre cliente e servidor. Explore mais funcionalidades do NestJs para enriquecer ainda mais seu projeto!

## Repositório no GitHub

Você pode acessar o código completo deste projeto no [GitHub](https://github.com/diogofelizardo/nestjs-chat-em-tempo-real-com-websockets).
