---
publishDate: 2024-09-27T19:40:00Z
author: Diogo Felizardo
title: 'Upload de Arquivos Públicos para Amazon S3 com NestJS'
excerpt: Aprenda a integrar o Amazon S3 com NestJS para realizar uploads de arquivos públicos, com um guia passo a passo e exemplos de código.
image: '~/assets/images/posts/5.jpg'
category: NestJS
tags:
  - nestjs
  - amazon-s3
  - upload
  - desenvolvimento
metadata:
  canonical: https://diogofelizardo.github.io/blog/upload-de-arquivos-publicos-para-amazon-s3-com-nestjs
---

## Sumário

1. [Introdução](#introdução)
2. [Configurando o Projeto NestJS](#configurando-o-projeto-nestjs)
3. [Instalando Dependências](#instalando-dependências)
4. [Configurando o Amazon S3](#configurando-o-amazon-s3)
5. [Criando o Serviço de Upload](#criando-o-serviço-de-upload)
6. [Criando o Controller de Upload](#criando-o-controller-de-upload)
7. [Testando o Upload de Arquivos](#testando-o-upload-de-arquivos)
8. [Considerações Finais](#considerações-finais)
9. [Repositório no GitHub](#repositório-no-github)

---

## Introdução

No desenvolvimento de aplicações web modernas, o armazenamento de arquivos é uma funcionalidade essencial. O Amazon S3 (Simple Storage Service) é uma solução escalável e confiável para armazenar e recuperar qualquer quantidade de dados a qualquer momento. Neste post, vamos explorar como integrar o Amazon S3 em uma aplicação NestJS para realizar o upload de arquivos públicos.

## Configurando o Projeto NestJS

Primeiramente, vamos criar um novo projeto NestJS. Se você já possui um projeto, pode pular para a próxima seção.

```bash
# Instale o CLI do NestJS globalmente, se ainda não tiver
npm install -g @nestjs/cli

# Crie um novo projeto
nest new upload-s3
```

Navegue até o diretório do projeto:

```bash
cd upload-s3
```

**Aqui coloca uma imagem do terminal mostrando a criação do projeto.**

## Instalando Dependências

Para interagir com o Amazon S3, precisamos instalar o AWS SDK e algumas outras dependências úteis.

```bash
npm install aws-sdk multer multer-s3 @nestjs/config
```

- **aws-sdk**: Biblioteca oficial da AWS para interagir com os serviços da AWS.
- **multer**: Middleware para lidar com multipart/form-data, usado para uploads de arquivos.
- **multer-s3**: Integração do Multer com o S3.
- **@nestjs/config**: Módulo para gerenciar variáveis de ambiente no NestJS.

## Configurando o Amazon S3

Antes de configurar o código, você precisa criar um bucket no Amazon S3 e obter as credenciais de acesso.

1. **Criar um Bucket no S3**
   - Acesse o console do [Amazon S3](https://s3.console.aws.amazon.com/s3/).
   - Clique em "Criar bucket".
   ![Criar bucket](~/assets/images/posts/5/bucket/1.png)
   - Dê um nome único ao bucket.
   ![Nome único](~/assets/images/posts/5/bucket/2.png)
   - Configure as permissões de acordo com sua necessidade (para arquivos públicos, certifique-se de configurar as permissões públicas).
   ![Configurar permissões](~/assets/images/posts/5/bucket/3.png)
   - Para saber qual em qual região esta seu bucket, basta clicar no menu ao lado do seu usuário, nesse caso é o **us-east-2** salve essa informação.
   ![Configurar permissões](~/assets/images/posts/5/bucket/4.png)


   

2. **Obter Credenciais de Acesso**
   - Acesse o [IAM Management Console](https://us-east-1.console.aws.amazon.com/iam/home#/users).
   - Crie um novo usuário.
   ![Criar usuário](~/assets/images/posts/5/user/1.png)
   - Dê um nome para seu usuário.
   ![Nome do usuário](~/assets/images/posts/5/user/2.png)
   - Busque e marque a política de permissão **AmazonS3FullAccess**, clique em próximo e depois **Criar usuário**
   ![Política de Permissão](~/assets/images/posts/5/user/3.png)
   - Com o usuário criado, clique em cima do mesmo e depois clique na aba de **Credenciais de Segurança**, logo em seguida escolha a opção **Criar chave de acesso**.
   ![Selecione o usuário](~/assets/images/posts/5/user/4.png)
   - No caso de uso, marque a opção **Código local** e va para o próximo passo.
   ![Selecione o usuário](~/assets/images/posts/5/user/5.png)
   - Defina uma etiqueta (opcional).
   ![Selecione o usuário](~/assets/images/posts/5/user/6.png)
   - Agora você tem acesso as duas chaves de acesso (publica e privada).
   ![Selecione o usuário](~/assets/images/posts/5/user/7.png)

## Configurando as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```env
AWS_ACCESS_KEY_ID=sua_chave_publica
AWS_SECRET_ACCESS_KEY=sua_chave_privada
AWS_S3_BUCKET_NAME=nome_do_seu_bucket
AWS_S3_REGION=sua_região
```

Assegure-se de adicionar o arquivo `.env` ao seu `.gitignore` para manter as credenciais seguras.

## Criando o Serviço de Upload

Vamos criar um serviço que encapsula a lógica de upload para o S3.

### Estrutura de Diretórios

```
src/
├── upload/
│   ├── upload.module.ts
│   ├── upload.service.ts
│   └── upload.controller.ts
```

### Código do Serviço

**`src/upload/upload.service.ts`**

```typescript
import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Multer } from 'multer';

@Injectable()
export class UploadService {
  private s3: AWS.S3;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
      secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      region: this.configService.get<string>('AWS_S3_REGION'),
    });
    this.bucketName = this.configService.get<string>('AWS_S3_BUCKET_NAME');
  }

  async uploadFile(file: Multer.File): Promise<AWS.S3.ManagedUpload.SendData> {
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.bucketName,
      Key: `${Date.now().toString()}-${file.originalname}`,
      Body: file.buffer,
      ACL: 'public-read',
      ContentType: file.mimetype,
    };

    return this.s3.upload(params).promise();
  }
}
```

## Criando o Controller de Upload

O controller irá expor um endpoint para receber os arquivos e delegar o upload para o serviço.

**`src/upload/upload.controller.ts`**

```typescript
import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { Multer } from 'multer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File) {
    const result = await this.uploadService.uploadFile(file);
    return {
      url: result.Location,
    };
  }
}
```

## Configurando o Módulo de Upload

**`src/upload/upload.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
```

## Atualizando o Módulo Principal

Certifique-se de importar o módulo de upload no módulo principal da aplicação.

**`src/app.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UploadModule,
  ],
})
export class AppModule {}
```

## Testando o Upload de Arquivos

Agora que tudo está configurado, vamos testar o endpoint de upload.

1. **Inicie a Aplicação**

   ```bash
   npm run start
   ```

2. **Use o Postman ou Insomnia para Testar**

   - **Método**: `POST`
   - **URL**: `http://localhost:3000/upload`
   - **Body**: Selecione `form-data`, adicione um campo `file` do tipo `File` e selecione o arquivo que deseja fazer upload.
   
   **Aqui coloca uma imagem mostrando a configuração no Postman.**

3. **Verifique a Resposta**

   A resposta deverá conter a URL pública do arquivo armazenado no S3.

   ```json
   {
     "url": "https://nome_do_seu_bucket.s3.sua-região.amazonaws.com/1234567890-seuarquivo.ext"
   }
   ```

4. **Verifique no S3**

   Acesse o console do S3 e verifique se o arquivo foi carregado no bucket correto.

## Considerações Finais

Integrar o Amazon S3 com NestJS para upload de arquivos públicos é uma maneira eficiente de gerenciar recursos estáticos em sua aplicação. Este guia abordou os passos essenciais para configurar o serviço, mas existem várias otimizações e funcionalidades adicionais que você pode implementar, como:

- **Validação de Tipos de Arquivo**: Assegure-se de que apenas tipos de arquivos permitidos sejam enviados.
- **Limitação de Tamanho**: Evite uploads de arquivos muito grandes que possam afetar o desempenho.
- **Gerenciamento de Erros**: Implemente um tratamento de erros robusto para lidar com falhas no upload.
- **URLs Temporárias**: Para maior segurança, considere gerar URLs temporárias para acesso aos arquivos.

Explore essas possibilidades para aprimorar ainda mais sua aplicação!


## Repositório no GitHub

Para acessar o código fonte deste projeto, visite o <a href="https://github.com/diogofelizardo/upload-s3-nestjs" target="_blank" rel="noopener noreferrer">Acesse o Repositório no GitHub</a>.

---

Espero que este guia tenha sido útil para você integrar o Amazon S3 em sua aplicação NestJS.
