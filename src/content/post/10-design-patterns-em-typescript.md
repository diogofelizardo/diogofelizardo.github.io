---
publishDate: 2024-10-06T12:00:00.000Z
author: Diogo Felizardo
title: 10 Design Patterns em TypeScript com Soluções para Problemas Reais
excerpt: Explore 10 padrões de design em TypeScript aplicados a problemas reais, melhorando a estrutura e a manutenção do seu código.
image: '~/assets/images/posts/14.jpg'
category: Typescript
tags:
  - TypeScript
  - Design Patterns
  - Desenvolvimento de Software
metadata:
  canonical: https://seu-blog.com/posts/10-design-patterns-em-typescript
---

Aplicar **Design Patterns** no desenvolvimento de software é essencial para resolver problemas comuns de forma eficiente e escalável. Neste post, vamos explorar **10 Design Patterns** aplicados em **TypeScript**, cada um resolvendo um problema real encontrado no desenvolvimento de aplicações modernas.

## Sumário

1. [Singleton](#singleton)
2. [Factory Method](#factory-method)
3. [Observer](#observer)
4. [Strategy](#strategy)
5. [Decorator](#decorator)
6. [Adapter](#adapter)
7. [Command](#command)
8. [Proxy](#proxy)
9. [Builder](#builder)
10. [Facade](#facade)
11. [Conclusão](#conclusão)
12. [Links Úteis](#links-úteis)
13. [Referências](#referências)

---

## 1. Singleton

O padrão **Singleton** assegura que uma classe tenha apenas uma única instância e fornece um ponto global de acesso a ela. Isso é particularmente útil para gerenciar recursos compartilhados, como conexões com banco de dados ou configurações de aplicação.

### Problema Real

Em uma aplicação web, você precisa garantir que haja apenas uma instância de conexão com o banco de dados para evitar múltiplas conexões desnecessárias que podem sobrecarregar o sistema.

### Exemplo

```typescript
// src/database/DatabaseConnection.ts
class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connection: any;

  private constructor() {
    // Simulação de conexão com o banco de dados
    this.connection = { /* conexão simulada */ };
    console.log('Conexão com o banco de dados estabelecida.');
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public query(sql: string): void {
    // Simulação de execução de uma consulta
    console.log(`Executando consulta: ${sql}`);
  }
}

// Uso
const db1 = DatabaseConnection.getInstance(); // Conexão com o banco de dados estabelecida.
db1.query('SELECT * FROM usuários'); // Executando consulta: SELECT * FROM usuários

const db2 = DatabaseConnection.getInstance();
db2.query('SELECT * FROM produtos'); // Executando consulta: SELECT * FROM produtos

console.log(db1 === db2); // true
```

- **DatabaseConnection.ts** define a classe `DatabaseConnection` com um construtor privado.
- O método estático `getInstance` garante que apenas uma instância seja criada.
- `query` simula a execução de uma consulta no banco de dados.
- O exemplo demonstra que `db1` e `db2` referenciam a mesma instância.

---

## 2. Factory Method

O padrão **Factory Method** fornece uma interface para criar objetos em uma superclasse, mas permite que as subclasses alterem o tipo de objetos que serão criados. Isso é útil para gerenciar a criação de objetos complexos ou variantes.

### Problema Real

Em uma aplicação de e-commerce, você precisa criar diferentes tipos de métodos de pagamento (Cartão de Crédito, PayPal, Boleto) sem acoplar o código cliente às implementações específicas.

### Exemplo

```typescript
// src/payment/PaymentMethod.ts
interface PaymentMethod {
  pay(amount: number): void;
}

class CreditCardPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando R$ ${amount} com Cartão de Crédito.`);
  }
}

class PayPalPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando R$ ${amount} com PayPal.`);
  }
}

class BoletoPayment implements PaymentMethod {
  pay(amount: number): void {
    console.log(`Pagando R$ ${amount} com Boleto.`);
  }
}

abstract class PaymentFactory {
  abstract createPaymentMethod(): PaymentMethod;

  public processPayment(amount: number): void {
    const paymentMethod = this.createPaymentMethod();
    paymentMethod.pay(amount);
  }
}

class CreditCardFactory extends PaymentFactory {
  createPaymentMethod(): PaymentMethod {
    return new CreditCardPayment();
  }
}

class PayPalFactory extends PaymentFactory {
  createPaymentMethod(): PaymentMethod {
    return new PayPalPayment();
  }
}

class BoletoFactory extends PaymentFactory {
  createPaymentMethod(): PaymentMethod {
    return new BoletoPayment();
  }
}

// Uso
const paymentFactories: PaymentFactory[] = [
  new CreditCardFactory(),
  new PayPalFactory(),
  new BoletoFactory(),
];

paymentFactories.forEach(factory => factory.processPayment(150));
// Output:
// Pagando R$150 com Cartão de Crédito.
// Pagando R$150 com PayPal.
// Pagando R$150 com Boleto.
```

- **PaymentMethod.ts** define a interface `PaymentMethod` e suas implementações concretas.
- `PaymentFactory` é uma classe abstrata que declara o método `createPaymentMethod`.
- `CreditCardFactory`, `PayPalFactory` e `BoletoFactory` implementam o método para criar métodos de pagamento específicos.
- O exemplo demonstra como processar pagamentos utilizando diferentes fábricas sem alterar o código cliente.

---

## 3. Observer

O padrão **Observer** estabelece uma dependência um-para-muitos entre objetos, onde uma mudança no estado de um objeto notifica e atualiza automaticamente todos os seus dependentes. É amplamente utilizado em sistemas de eventos e notificações.

### Problema Real

Em uma aplicação de chat em tempo real, quando um usuário envia uma mensagem, todos os participantes da sala devem receber a nova mensagem instantaneamente.

### Exemplo

```typescript
// src/chat/Observer.ts
interface Observer {
  update(message: string): void;
}

class User implements Observer {
  constructor(private name: string) {}

  update(message: string): void {
    console.log(`${this.name} recebeu a mensagem: "${message}"`);
  }
}

class ChatRoom {
  private users: Observer[] = [];

  subscribe(user: Observer): void {
    this.users.push(user);
    console.log('Novo usuário entrou na sala.');
  }

  unsubscribe(user: Observer): void {
    this.users = this.users.filter(u => u !== user);
    console.log('Usuário saiu da sala.');
  }

  broadcast(message: string): void {
    console.log(`Enviando mensagem: "${message}" para todos os usuários.`);
    this.users.forEach(user => user.update(message));
  }
}

// Uso
const chatRoom = new ChatRoom();

const alice = new User('Alice');
const bob = new User('Bob');
const carol = new User('Carol');

chatRoom.subscribe(alice); // Novo usuário entrou na sala.
chatRoom.subscribe(bob); // Novo usuário entrou na sala.
chatRoom.subscribe(carol); // Novo usuário entrou na sala.

chatRoom.broadcast('Bem-vindos à sala de chat!');
// Alice recebeu a mensagem: "Bem-vindos à sala de chat!"
// Bob recebeu a mensagem: "Bem-vindos à sala de chat!"
// Carol recebeu a mensagem: "Bem-vindos à sala de chat!"

chatRoom.unsubscribe(bob);
// Usuário saiu da sala.

chatRoom.broadcast('Bob saiu da sala.');
// Alice recebeu a mensagem: "Bob saiu da sala."
// Carol recebeu a mensagem: "Bob saiu da sala."
```

- **Observer.ts** define a interface `Observer` e a classe `User` que implementa essa interface.
- `ChatRoom` gerencia a lista de usuários e notifica-os quando uma nova mensagem é enviada.
- O exemplo demonstra a inscrição de usuários na sala de chat, envio de mensagens e a desinscrição de um usuário.

---

## 4. Strategy

O padrão **Strategy** define uma família de algoritmos, encapsula cada um e os torna intercambiáveis. Permite que o algoritmo varie independentemente dos clientes que o utilizam. É ideal para cenários onde múltiplas abordagens podem ser aplicadas para resolver um mesmo problema.

### Problema Real

Em uma aplicação de processamento de imagens, você deseja aplicar diferentes filtros (como preto e branco, sépia, etc.) às imagens sem modificar o código principal de processamento.

### Exemplo

```typescript
// src/image/Strategy.ts
interface ImageFilterStrategy {
  applyFilter(image: string): string;
}

class BlackAndWhiteFilter implements ImageFilterStrategy {
  applyFilter(image: string): string {
    return `${image} com filtro Preto e Branco aplicado.`;
  }
}

class SepiaFilter implements ImageFilterStrategy {
  applyFilter(image: string): string {
    return `${image} com filtro Sépia aplicado.`;
  }
}

class ImageProcessor {
  private filterStrategy: ImageFilterStrategy;

  constructor(filterStrategy: ImageFilterStrategy) {
    this.filterStrategy = filterStrategy;
  }

  setFilterStrategy(filterStrategy: ImageFilterStrategy): void {
    this.filterStrategy = filterStrategy;
  }

  process(image: string): string {
    return this.filterStrategy.applyFilter(image);
  }
}

// Uso
const processor = new ImageProcessor(new BlackAndWhiteFilter());
console.log(processor.process('Imagem1.jpg')); // Imagem1.jpg com filtro Preto e Branco aplicado.

processor.setFilterStrategy(new SepiaFilter());
console.log(processor.process('Imagem2.jpg')); // Imagem2.jpg com filtro Sépia aplicado.
```

- **Strategy.ts** define a interface `ImageFilterStrategy` e suas implementações concretas.
- `ImageProcessor` utiliza uma estratégia para aplicar filtros às imagens.
- O exemplo demonstra como trocar dinamicamente a estratégia de filtro sem alterar o código do processador.

---

## 5. Decorator

O padrão **Decorator** permite adicionar funcionalidades a objetos de forma dinâmica, sem alterar sua estrutura. É útil para estender funcionalidades de forma flexível e modular.

### Problema Real

Em uma aplicação de e-commerce, você deseja adicionar diferentes opções de embalagem (presente, eco-friendly) aos produtos sem modificar a classe base dos produtos.

### Exemplo

```typescript
// src/ecommerce/Decorator.ts
interface Product {
  getDescription(): string;
  getPrice(): number;
}

class BasicProduct implements Product {
  constructor(private name: string, private price: number) {}

  getDescription(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price;
  }
}

class ProductDecorator implements Product {
  constructor(protected product: Product) {}

  getDescription(): string {
    return this.product.getDescription();
  }

  getPrice(): number {
    return this.product.getPrice();
  }
}

class GiftWrapDecorator extends ProductDecorator {
  getDescription(): string {
    return `${super.getDescription()} com Embalagem para Presente`;
  }

  getPrice(): number {
    return super.getPrice() + 5;
  }
}

class EcoFriendlyDecorator extends ProductDecorator {
  getDescription(): string {
    return `${super.getDescription()} com Embalagem Eco-Friendly`;
  }

  getPrice(): number {
    return super.getPrice() + 3;
  }
}

// Uso
let product: Product = new BasicProduct('Caneca', 20);
console.log(`${product.getDescription()} - R$${product.getPrice()}`); // Caneca - R$20

product = new GiftWrapDecorator(product);
console.log(`${product.getDescription()} - R$${product.getPrice()}`); // Caneca com Embalagem para Presente - R$25

product = new EcoFriendlyDecorator(product);
console.log(`${product.getDescription()} - R$${product.getPrice()}`); // Caneca com Embalagem para Presente com Embalagem Eco-Friendly - R$28

```

- **Decorator.ts** define a interface `Product` e a classe `BasicProduct`.
- `ProductDecorator` serve como base para os decoradores concretos.
- `GiftWrapDecorator` e `EcoFriendlyDecorator` adicionam funcionalidades específicas ao produto.
- O exemplo demonstra como adicionar opções de embalagem de forma flexível.

---

## 6. Adapter

O padrão **Adapter** permite que classes com interfaces incompatíveis trabalhem juntas, convertendo a interface de uma classe na interface que o cliente espera. É útil para integrar componentes existentes que não foram projetados para trabalhar juntos.

### Problema Real

Você está integrando um serviço de terceiros para envio de notificações por SMS, mas a interface do serviço não corresponde à interface que sua aplicação utiliza para notificações.

### Exemplo

```typescript
// src/notifications/Adapter.ts
interface ExampleNotification {
  send(message: string): void;
}

class SMSService {
  sendSMS(message: string): void {
    console.log(`Enviando SMS: ${message}`);
  }
}

class SMSAdapter implements ExampleNotification {
  private smsService: SMSService;

  constructor(smsService: SMSService) {
    this.smsService = smsService;
  }

  send(message: string): void {
    this.smsService.sendSMS(message);
  }
}

class NotificationManager {
  constructor(private notifier: ExampleNotification) { }

  notify(message: string): void {
    this.notifier.send(message);
  }
}

// Uso
const smsService = new SMSService();
const smsAdapter = new SMSAdapter(smsService);
const notifier = new NotificationManager(smsAdapter);

notifier.notify('Olá! Sua compra foi realizada com sucesso.');  // Enviando SMS: Olá! Sua compra foi realizada com sucesso.
```

- **Adapter.ts** define a interface `Notification` e a classe `SMSService`.
- `SMSAdapter` adapta `SMSService` para a interface `Notification`.
- `NotificationManager` utiliza a interface `Notification` para enviar notificações.
- O exemplo demonstra a integração do serviço de SMS existente com a interface esperada pela aplicação.

---

## 7. Command

O padrão **Command** encapsula uma solicitação como um objeto, permitindo parametrizar clientes com diferentes solicitações, enfileirar ou registrar solicitações e suportar operações que podem ser desfeitas. É útil para implementar funcionalidades como desfazer/refazer ações e gerenciamento de filas de tarefas.

### Problema Real

Em um editor de texto, você deseja implementar funcionalidades de desfazer e refazer ações, como digitar texto, formatar e deletar.

### Exemplo

```typescript
// src/editor/Command.ts
interface Command {
  execute(): void;
  undo(): void;
}

class Editor {
  private content: string = '';

  append(text: string): void {
    this.content += text;
    console.log(`Conteúdo atual: "${this.content}"`);
  }

  deleteLast(n: number): void {
    this.content = this.content.slice(0, -n);
    console.log(`Conteúdo atual: "${this.content}"`);
  }

  getContent(): string {
    return this.content;
  }
}

class AppendCommand implements Command {
  constructor(private editor: Editor, private text: string) {}

  execute(): void {
    this.editor.append(this.text);
  }

  undo(): void {
    this.editor.deleteLast(this.text.length);
  }
}

class DeleteCommand implements Command {
  private deletedText: string = '';

  constructor(private editor: Editor, private count: number) {}

  execute(): void {
    const content = this.editor.getContent();
    this.deletedText = content.slice(-this.count);
    this.editor.deleteLast(this.count);
  }

  undo(): void {
    this.editor.append(this.deletedText);
  }
}

class CommandManager {
  private history: Command[] = [];
  private undone: Command[] = [];

  executeCommand(command: Command): void {
    command.execute();
    this.history.push(command);
    this.undone = [];
  }

  undo(): void {
    const command = this.history.pop();
    if (command) {
      command.undo();
      this.undone.push(command);
    }
  }

  redo(): void {
    const command = this.undone.pop();
    if (command) {
      command.execute();
      this.history.push(command);
    }
  }
}

// Uso
const editor = new Editor();
const manager = new CommandManager();

const appendHello = new AppendCommand(editor, 'Hello');
manager.executeCommand(appendHello); // Conteúdo atual: "Hello"

const appendWorld = new AppendCommand(editor, ' World');
manager.executeCommand(appendWorld); // Conteúdo atual: "Hello World"

manager.undo(); // Reverte " World" -> Conteúdo atual: "Hello"
manager.redo(); // Reaplica " World" -> Conteúdo atual: "Hello World"

const deleteWorld = new DeleteCommand(editor, 6);
manager.executeCommand(deleteWorld); // Conteúdo atual: "Hello"

manager.undo(); // Reverte deleção -> Conteúdo atual: "Hello World"
```

- **Command.ts** define a interface `Command` e implementações concretas `AppendCommand` e `DeleteCommand`.
- `Editor` representa o receptor que executa as ações.
- `CommandManager` gerencia o histórico de comandos para suportar desfazer e refazer.
- O exemplo demonstra a execução, desfazimento e refazimento de comandos no editor de texto.

---

## 8. Proxy

O padrão **Proxy** fornece um substituto ou representante para controlar o acesso a outro objeto. É útil para implementar funcionalidades como lazy loading, controle de acesso, logging e cache.

### Problema Real

Em uma aplicação de streaming de vídeos, você deseja carregar metadados de vídeos apenas quando necessário, evitando carregamentos desnecessários e melhorando a performance.

### Exemplo

```typescript
// src/streaming/Proxy.ts
interface Video {
  play(): void;
}

class RealVideo implements Video {
  constructor(private filename: string) {
    this.loadFromDisk();
  }

  private loadFromDisk(): void {
    console.log(`Carregando vídeo: ${this.filename}`);
  }

  play(): void {
    console.log(`Reproduzindo vídeo: ${this.filename}`);
  }
}

class VideoProxy implements Video {
  private realVideo: RealVideo | null = null;
  constructor(private filename: string) {}

  play(): void {
    if (!this.realVideo) {
      this.realVideo = new RealVideo(this.filename);
    }
    this.realVideo.play();
  }
}

class VideoPlayer {
  playVideo(video: Video): void {
    video.play();
  }
}

// Uso
const proxyVideo = new VideoProxy('video1.mp4'); // Carregando vídeo: video1.mp4
const player = new VideoPlayer();

player.playVideo(proxyVideo); // Carregando e reproduzindo o vídeo
player.playVideo(proxyVideo); // Apenas reproduzindo o vídeo
```

- **Proxy.ts** define a interface `Video` e as classes `RealVideo` e `VideoProxy`.
- `VideoProxy` controla o acesso a `RealVideo`, carregando-o apenas quando necessário.
- `VideoPlayer` utiliza a interface `Video` para reproduzir vídeos.
- O exemplo demonstra como o proxy gerencia o carregamento de vídeos de forma eficiente.

---

## 9. Builder

O padrão **Builder** separa a construção de um objeto complexo de sua representação, permitindo a criação de diferentes representações usando o mesmo processo de construção. É útil para criar objetos com múltiplas partes ou configurações opcionais.

### Problema Real

Em uma aplicação de geração de relatórios, você precisa criar relatórios com diferentes seções (como gráficos, tabelas, resumos) sem complicar o processo de montagem do relatório.

### Exemplo

```typescript
// src/reports/Builder.ts
class ReportExample {
  public title: string = '';
  public content: string = '';
  public charts: string[] = [];
  public tables: string[] = [];

  public display(): void {
    console.log(`Título: ${this.title}`);
    console.log(`Conteúdo: ${this.content}`);
    if (this.charts.length > 0) {
      console.log('Gráficos:');
      this.charts.forEach(chart => console.log(` - ${chart}`));
    }
    if (this.tables.length > 0) {
      console.log('Tabelas:');
      this.tables.forEach(table => console.log(` - ${table}`));
    }
  }
}

interface ReportBuilder {
  setTitle(title: string): void;
  setContent(content: string): void;
  addChart(chart: string): void;
  addTable(table: string): void;
  getReportExample(): ReportExample;
}

class DetailedReportBuilder implements ReportBuilder {
  private report: ReportExample;

  constructor() {
    this.report = new ReportExample();
  }

  setTitle(title: string): void {
    this.report.title = title;
  }

  setContent(content: string): void {
    this.report.content = content;
  }

  addChart(chart: string): void {
    this.report.charts.push(chart);
  }

  addTable(table: string): void {
    this.report.tables.push(table);
  }

  getReportExample(): ReportExample {
    return this.report;
  }
}

class ReportDirector {
  private builder: ReportBuilder;

  constructor(builder: ReportBuilder) {
    this.builder = builder;
  }

  construct(title: string, content: string, charts: string[], tables: string[]): void {
    this.builder.setTitle(title);
    this.builder.setContent(content);
    charts.forEach(chart => this.builder.addChart(chart));
    tables.forEach(table => this.builder.addTable(table));
  }
}

// Uso
const builder = new DetailedReportBuilder();
const director = new ReportDirector(builder);

director.construct(
  'Relatório de Vendas',
  'Este relatório apresenta as vendas do último trimestre.',
  ['Gráfico de Vendas por Região', 'Gráfico de Crescimento Mensal'],
  ['Tabela de Vendas por Produto']
);

const report = builder.getReportExample();
report.display();
// Output:
// Título: Relatório de Vendas
// Conteúdo: Este relatório apresenta as vendas do último trimestre.
// Gráficos:
//  - Gráfico de Vendas por Região
//  - Gráfico de Crescimento Mensal
// Tabelas:
//  - Tabela de Vendas por Produto
```

- **Builder.ts** define a classe `Report` e a interface `ReportBuilder`.
- `DetailedReportBuilder` implementa `ReportBuilder` para construir um relatório detalhado.
- `ReportDirector` coordena o processo de construção do relatório.
- O exemplo demonstra a criação de um relatório com título, conteúdo, gráficos e tabelas de forma organizada.

---

## 10. Facade

O padrão **Facade** fornece uma interface unificada para um conjunto de interfaces em um subsistema, facilitando o uso do subsistema. É útil para simplificar interações complexas entre componentes ou serviços.

### Problema Real

Em uma aplicação de processamento de pedidos, você precisa interagir com múltiplos serviços (estoque, pagamento, envio) para completar um pedido. O padrão Facade pode simplificar essa interação.

### Exemplo

```typescript
// src/orders/Facade.ts
class InventoryService {
  checkStock(productId: number, quantity: number): boolean {
    console.log(`Verificando estoque para produto ${productId}: quantidade ${quantity}`);
    // Simulação de verificação de estoque
    return true;
  }

  reserveStock(productId: number, quantity: number): void {
    console.log(`Reservando ${quantity} unidades do produto ${productId}`);
  }
}

class PaymentService {
  processPayment(amount: number): boolean {
    console.log(`Processando pagamento de R$${amount}`);
    // Simulação de processamento de pagamento
    return true;
  }
}

class ShippingService {
  arrangeShipping(productId: number, quantity: number): void {
    console.log(`Organizando envio de ${quantity} unidades do produto ${productId}`);
  }
}

class OrderFacade {
  private inventoryService: InventoryService;
  private paymentService: PaymentService;
  private shippingService: ShippingService;

  constructor() {
    this.inventoryService = new InventoryService();
    this.paymentService = new PaymentService();
    this.shippingService = new ShippingService();
  }

  placeOrder(productId: number, quantity: number, amount: number): void {
    if (this.inventoryService.checkStock(productId, quantity)) {
      this.inventoryService.reserveStock(productId, quantity);
      if (this.paymentService.processPayment(amount)) {
        this.shippingService.arrangeShipping(productId, quantity);
        console.log('Pedido realizado com sucesso!');
      } else {
        console.log('Falha no processamento do pagamento.');
      }
    } else {
      console.log('Estoque insuficiente para o pedido.');
    }
  }
}

// Uso
const orderFacade = new OrderFacade();
orderFacade.placeOrder(101, 2, 150);
// Output:
// Verificando estoque para produto 101: quantidade 2
// Reservando 2 unidades do produto 101
// Processando pagamento de R$150
// Organizando envio de 2 unidades do produto 101
// Pedido realizado com sucesso!
```

- **Facade.ts** define os serviços `InventoryService`, `PaymentService` e `ShippingService`.
- `OrderFacade` fornece uma interface unificada para interagir com esses serviços ao realizar um pedido.
- O exemplo demonstra como simplificar o processo de realização de pedidos, ocultando a complexidade dos serviços internos.

---

## Conclusão

Explorar e aplicar **10 Design Patterns** em **TypeScript** a partir de problemas reais nos permite criar soluções robustas, escaláveis e de fácil manutenção. Cada padrão aborda desafios específicos no desenvolvimento de software, promovendo a reutilização de código e a separação de responsabilidades. Dominar esses padrões capacita você a enfrentar situações complexas com confiança e eficácia. Continue praticando e adaptando esses padrões conforme as necessidades dos seus projetos evoluem!

---

## Links Úteis

- [Repositório no GitHub](https://github.com/diogofelizardo/10-design-patterns-typescript)
- [Documentação do TypeScript](https://www.typescriptlang.org/docs/)
- [Refactoring Guru - Design Patterns](https://refactoring.guru/design-patterns)

## Referências

- [Design Patterns: Elements of Reusable Object-Oriented Software](https://en.wikipedia.org/wiki/Design_Patterns)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Refactoring Guru](https://refactoring.guru/design-patterns)

---
