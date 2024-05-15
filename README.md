# Hotel Scraper with NestJS

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

## Contexto

O viajante chega ao bot e pede “Cotação de preço”. Em seguida, o bot pergunta as datas em que o viajante deseja ficar no hotel do bot. No momento em que o viajante preenche os dados solicitados o bot precisa pesquisar os preços de cada quarto disponível no horário de check-in/check-out.

Com o puppeteer, o bot vai para o URL fornecida

```
https://pratagy.letsbook.com.br/D/Reserva
```

Após isso, o bot recupera todas as informações necessárias para montar a payload usando métodos de web crawling

### Importante, a versão recomendada do node pra rodar esse projeto é >=20.9.0

## Features

Esse repositório contém

- 🟢 Node.JS
- 🔥 Nest.JS
- 🐶 Puppeteer
- ✨ TypeScript
- 📩 DotEnv
- 💚 Swagger
- 🃏 Jest and Supertest
- ✍️ Prettier and Eslint
- 🌬️ Husky with Conventional Commits
- 📰 Standard Version

## Dev Features

- 📈 Absolute Import and Path Alias — Uma alternativa do typescript pra importar arquivos sem precisar de "../../", ao invés disso usamos "@/(pasta)"
- 📏 ESLint — O ESLint serve pra procurar problemas de escrita dentro do código (pode ser personalizado conforme as vontades do usuário)
- 💖 Prettier and Eslint — Formata o código automaticamente com os padrões definidos do usuário
- 🐶 Husky, Lint Staged — Serve pra rodar uma série de scripts nos arquivos prestes a commitar ou a subir
- 🤖 Conventional Commit Lint — Serve pra conferir se os commits estão sendo feitos usando Conventional Commit (https://www.conventionalcommits.org/en/v1.0.0/)
- ⏰ Standard Version — Gera um changelog automatico a cada build, mostrando todas as mudanças que foram feitas
- 🟢 Swagger - Todos os endpoints estão documentados no swagger (path: "/swagger")

## Getting Started

### 1. Instalar dependências

Nesse projeto o npm é recomendado de ser utilizado

```bash
npm install
```

### 2. Clonar o .env.example

Crie um arquivo .env usando de base o .env.example na raiz do projeto

### 3. Rodar a aplicação

Rode a aplicação de forma local utilizando

```bash
npm run start:dev
```

## Sempre lembrar dos conventional commits

Esse projeto utiliza [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/), é obrigatório o uso pra commitar

## Comandos úteis

Test - Responsável por rodar todos os testes unitários da aplicação e conferir se tudo está nos conformes!

```bash
npm run test
```

Você também pode utilizar o test:watch pra conferir os testes unitários em tempo real

```bash
npm run test:watch
```

Lint - Responsável por rodar o eslint e formatar o código conforme os padrões

```bash
npm run lint
```

Format - Responsável por rodar o prettier e formatar o código conforme os padrões

```bash
npm run format
```

Release - Gera um CHANGELOG automático conforme os

```bash
npm run release
```

## Autor

 <div style="display: flex; flex-direction: column; gap: 1rem; font-size: 15px">
 <a href="https://www.linkedin.com/in/cleberschiavon">
 <b>Cleber Henrique</b>
</a>
 <a href="mailto:cleberschiavon@outlook.com">
cleberschiavon@outlook.com
</a>
 </div>

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/cleberschiavon)

