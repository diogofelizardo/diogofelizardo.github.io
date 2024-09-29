---
publishDate: 2024-09-28T19:00:00Z
author: Diogo Felizardo
title: Escrevendo Testes Unitários no NestJS
excerpt: Aprenda como escrever testes unitários no NestJS utilizando o Jest para garantir a qualidade da sua aplicação.
image: '~/assets/images/posts/8.jpg'
category: NestJS
tags:
  - nestjs
  - testes unitários
  - jest
metadata:
  canonical: https://diogofelizardo.github.io/blog/escrevendo-testes-unitarios-nestjs
---


Neste artigo, vamos explorar como escrever testes unitários eficazes para garantir a qualidade e a confiabilidade da sua aplicação. Vamos abordar desde os conceitos básicos até exemplos práticos utilizando Jest, a ferramenta de testes padrão no NestJS.

## Sumário

1. [Introdução](#introdução)
2. [Iniciando um Novo Projeto com NestJS](#iniciando-um-novo-projeto-com-nestjs)
3. [Introdução aos Testes Unitários](#introdução-aos-testes-unitários)
4. [Por que Utilizar Testes Unitários no NestJS?](#por-que-utilizar-testes-unitários-no-nestjs)
5. [Configurando o Ambiente de Testes](#configurando-o-ambiente-de-testes)
6. [Escrevendo o Primeiro Teste Unitário](#escrevendo-o-primeiro-teste-unitário)
7. [Utilizando Jest no NestJS](#utilizando-jest-no-nestjs)
8. [Exemplo Prático: Testando um Serviço](#exemplo-prático-testando-um-serviço)
9. [Dicas e Boas Práticas](#dicas-e-boas-práticas)
10. [Conclusão](#conclusão)

---

## Introdução

Neste post, vamos aprofundar no desenvolvimento de APIs com NestJS, focando na importância dos testes unitários. Garantir que cada parte do seu código funcione corretamente é essencial para criar aplicações robustas e confiáveis.

## Iniciando um Novo Projeto com NestJS

Antes de começarmos a escrever testes unitários, precisamos ter um projeto NestJS configurado. Siga os passos abaixo para iniciar um novo projeto.

### 1. Pré-requisitos

- **Node.js**: Certifique-se de ter o Node.js instalado. Você pode verificar a instalação executando:

  ```bash
  node -v
  ```

  Se não estiver instalado, faça o download em [nodejs.org](https://nodejs.org/).

- **Nest CLI**: O NestJS fornece uma interface de linha de comando (CLI) que facilita a criação e o gerenciamento de projetos. Instale o Nest CLI globalmente com o seguinte comando:

  ```bash
  npm install -g @nestjs/cli
  ```

  Verifique a instalação:

  ```bash
  nest --version
  ```

### 2. Criando um Novo Projeto

Para iniciar um novo projeto NestJS, utilize o comando `nest new` seguido do nome do projeto. Por exemplo, para criar um projeto chamado `api-nestjs`:

```bash
nest new api-nestjs
```

Você será solicitado a escolher o gerenciador de pacotes (npm ou yarn). Selecione o de sua preferência.

### 3. Estrutura do Projeto

Após a criação, a estrutura básica do projeto será semelhante a esta:

```
api-nestjs/
├── src/
│   ├── app.controller.ts
│   ├── app.controller.spec.ts
│   ├── app.module.ts
│   ├── app.service.ts
│   └── main.ts
├── test/
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
├── .eslintrc.js
├── .gitignore
├── jest.config.js
├── nest-cli.json
├── package.json
├── README.md
└── tsconfig.json
```

### 4. Executando o Projeto

Para iniciar o servidor de desenvolvimento, navegue até a pasta do projeto e execute:

```bash
cd api-nestjs
npm run start:dev
```

O servidor estará rodando em `http://localhost:3000`. Você pode acessar essa URL no seu navegador para verificar se a aplicação está funcionando corretamente.

## Introdução aos Testes Unitários

Testes unitários são fundamentais para garantir que cada parte individual do seu código funcione conforme o esperado. Eles ajudam a identificar e corrigir bugs precocemente, facilitam a manutenção do código e promovem um desenvolvimento mais robusto e confiável.

## Por que Utilizar Testes Unitários no NestJS?

O NestJS, sendo um framework modular e extensível para Node.js, oferece uma estrutura ideal para a implementação de testes unitários. Com a integração nativa do Jest, você pode escrever testes de forma simples e eficiente, garantindo que seus módulos, serviços e controladores funcionem corretamente.

## Configurando o Ambiente de Testes

Antes de começarmos a escrever testes, é importante garantir que o ambiente de testes esteja configurado corretamente. O NestJS já vem pré-configurado com Jest, mas vamos revisar as principais configurações.

1. **Instalação das Dependências:**

   Se você criou seu projeto com o Nest CLI, o Jest já deve estar instalado. Caso contrário, instale as dependências necessárias:

   ```bash
   npm install --save-dev jest @types/jest ts-jest
   ```

2. **Configuração do Jest:**

   Verifique se o arquivo `jest.config.js` está presente na raiz do seu projeto:

   ```javascript
   module.exports = {
     moduleFileExtensions: ['js', 'json', 'ts'],
     rootDir: 'src',
     testRegex: '.*\\.spec\\.ts$',
     transform: {
       '^.+\\.ts$': 'ts-jest',
     },
     collectCoverageFrom: ['**/*.(t|j)s'],
     coverageDirectory: '../coverage',
     testEnvironment: 'node',
   };
   ```

3. **Altere ou adicione essa configuração no package.json:**
    ```javascript
    "scripts": {
      "test": "jest --config jest.config.js",
    }
    ```  

## Escrevendo o Primeiro Teste Unitário

Vamos criar um teste simples para um serviço que soma dois números.

### 1. Criando o Serviço

Crie um arquivo `sum.service.ts` em `src/sum/`:

```typescript
// src/sum/sum.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class SumService {
  sum(a: number, b: number): number {
    return a + b;
  }
}
```

### 2. Escrevendo o Teste

Crie o arquivo de teste `sum.service.spec.ts` em `src/sum/`:

```typescript
// src/sum/sum.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SumService } from './sum.service';

describe('SumService', () => {
  let service: SumService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SumService],
    }).compile();

    service = module.get<SumService>(SumService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the sum of two numbers', () => {
    expect(service.sum(2, 3)).toBe(5);
    expect(service.sum(-1, 1)).toBe(0);
  });
});
```

### 3. Executando os Testes

Execute os testes com o comando:

```bash
npm run test
```

Você deve ver uma saída indicando que os testes passaram com sucesso.

## Utilizando Jest no NestJS

O Jest é um framework de testes completo que oferece funcionalidades como mocks, spies e cobertura de código. No contexto do NestJS, ele se integra perfeitamente, permitindo escrever testes de forma intuitiva.

### Principais Funcionalidades do Jest:

- **Mocks e Spies:** Permitem simular comportamentos e monitorar chamadas de funções.
- **Cobertura de Código:** Gera relatórios que indicam quais partes do código estão cobertas por testes.
- **Snapshots:** Úteis para testar componentes que retornam interfaces complexas.

## Exemplo Prático: Testando um Serviço

Vamos aprofundar e criar um serviço mais complexo que interage com um repositório. Suponha que temos um serviço que gerencia usuários.

### 1. Criando o Serviço e o Repositório

#### Serviço de Usuários

Crie o arquivo `users.service.ts` em `src/users/`:

```typescript
// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.create(user);
  }
}
```

#### Repositório de Usuários

Crie o arquivo `users.repository.ts` em `src/users/`:

```typescript
// src/users/users.repository.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersRepository {
  private users: User[] = [];

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  create(user: User): Promise<User> {
    this.users.push(user);
    return Promise.resolve(user);
  }
}
```

#### Entidade de Usuário

Crie o arquivo `user.entity.ts` em `src/users/`:

```typescript
// src/users/user.entity.ts
export class User {
  id: number;
  name: string;
  email: string;
}
```

### 2. Escrevendo os Testes

Crie o arquivo de teste `users.service.spec.ts` em `src/users/`:

```typescript
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';

// Define um grupo de testes para o UsersService
describe('UsersService', () => {
  // Declaração das variáveis que armazenarão as instâncias do serviço e do repositório
  let service: UsersService;
  let repository: UsersRepository;

  // Função que será executada antes de cada teste individual
  beforeEach(async () => {
    // Cria um módulo de teste configurado com os provedores necessários
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, UsersRepository],
    }).compile();

    // Obtém a instância do UsersService a partir do módulo de teste
    service = module.get<UsersService>(UsersService);
    // Obtém a instância do UsersRepository a partir do módulo de teste
    repository = module.get<UsersRepository>(UsersRepository);
  });

  // Teste para verificar se o serviço foi definido corretamente
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Agrupa os testes relacionados ao método findAll
  describe('findAll', () => {
    // Teste para verificar se o método findAll retorna um array de usuários
    it('should return an array of users', async () => {
      // Define o resultado esperado que o método findAll deve retornar
      const result: User[] = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
      ];
      // Cria um mock do método findAll do UsersRepository, fazendo com que retorne o resultado definido
      jest.spyOn(repository, 'findAll').mockResolvedValue(result);

      // Executa o método findAll do serviço e verifica se o resultado é igual ao esperado
      expect(await service.findAll()).toBe(result);
    });

    // Teste de falha para verificar o comportamento do método findAll quando o repositório lança uma exceção
    it('should throw an error if repository.findAll fails', async () => {
      // Define a mensagem de erro que será lançada
      const errorMessage = 'Failed to fetch users';
      // Cria um mock que faz com que o método findAll do repositório lance uma exceção
      jest.spyOn(repository, 'findAll').mockRejectedValue(new Error(errorMessage));

      // Executa o método findAll do serviço e espera que ele lance a exceção
      await expect(service.findAll()).rejects.toThrow(errorMessage);
    });
  });

  // Agrupa os testes relacionados ao método create
  describe('create', () => {
    // Teste para verificar se o método create cria e retorna um novo usuário
    it('should create and return a new user', async () => {
      // Define o novo usuário que será criado
      const newUser: User = { id: 2, name: 'Jane Doe', email: 'jane@example.com' };
      // Cria um mock do método create do UsersRepository, fazendo com que retorne o novo usuário definido
      jest.spyOn(repository, 'create').mockResolvedValue(newUser);

      // Executa o método create do serviço com o novo usuário e verifica se o resultado é igual ao usuário criado
      expect(await service.create(newUser)).toBe(newUser);
    });

    // Teste de falha para verificar o comportamento do método create quando o repositório lança uma exceção
    it('should throw an error if repository.create fails', async () => {
      // Define a mensagem de erro que será lançada
      const errorMessage = 'Failed to create user';
      // Define o usuário que será tentado criar
      const newUser: User = { id: 3, name: 'Alice Doe', email: 'alice@example.com' };
      // Cria um mock que faz com que o método create do repositório lance uma exceção
      jest.spyOn(repository, 'create').mockRejectedValue(new Error(errorMessage));

      // Executa o método create do serviço e espera que ele lance a exceção
      await expect(service.create(newUser)).rejects.toThrow(errorMessage);
    });
  });
});
```

### 3. Executando os Testes

Execute os testes com o comando:

```bash
npm run test
```

Os testes devem ser executados com sucesso, validando o comportamento do `UsersService`.

## Dicas e Boas Práticas

- **Escreva Testes Independentes:** Cada teste deve ser isolado para evitar dependências e facilitar a manutenção.
- **Utilize Mocks Apropriadamente:** Simule dependências externas para focar no comportamento da unidade testada.
- **Cobertura de Código:** Monitore a cobertura de testes e busque cobrir todos os cenários importantes.
- **Mantenha os Testes Atualizados:** Atualize os testes conforme o código evolui para garantir sua relevância.
- **Descreva Claramente os Testes:** Use descrições claras e objetivas para facilitar a compreensão dos objetivos de cada teste.

## Conclusão

Escrever testes unitários é uma prática essencial para desenvolver APIs robustas e confiáveis com NestJS. Ao integrar testes no seu fluxo de desenvolvimento, você garante a qualidade do código, facilita a manutenção e reduz a probabilidade de introduzir bugs. Esperamos que este artigo tenha fornecido uma base sólida para você começar a implementar testes unitários na sua aplicação NestJS. Nos próximos posts, continuaremos explorando outras funcionalidades e melhores práticas para aprimorar ainda mais seu projeto. Até lá, bons testes!
