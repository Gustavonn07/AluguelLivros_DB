# AluguelLivros_DB

API REST em Node.js com autenticação via JWT, documentação Swagger, Prisma ORM e suporte a PostgreSQL.

---

## Tecnologias e Dependências

- **Node.js 20+** – Ambiente de execução JavaScript
- **Express** – Framework minimalista para construção de APIs
- **Prisma** – ORM moderno para integração com PostgreSQL
- **JWT (jsonwebtoken)** – Autenticação baseada em tokens
- **bcrypt** – Criptografia de senhas
- **dotenv** – Variáveis de ambiente
- **swagger-jsdoc + swagger-ui-express** – Documentação automática da API
- **yup** – Validação de dados
- **cors** – Middleware para habilitar CORS
- **nodemon** – Atualização automática em ambiente de desenvolvimento

---

## Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Gustavonn07/AluguelLivros_DB.git
cd AluguelLivros_DB
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Configurar variáveis de ambiente

Crie um arquivo .env com base no .env.example:

```bash
PORT=3000
NODE_ENV=development
DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
```

### 4. Inicializar o banco de dados (PostgreSQL)

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Inicializar o banco de dados (PostgreSQL)

Em modo desenvolvimento (com auto reload)

```bash
npm run start:dev
```

Em modo produção

```bash
npm run start:prod
```

## 📂 Estrutura de Pastas
├── src
<br/>
│   ├── routes/         # Arquivos de rotas da API (ex: UserRouter.js)
<br/>
│   ├── services/       # Lógica de negócio (ex: UserService.js)
<br/>
│   ├── shared/         # Validações e utilitários compartilhados
<br/>
│   └── server.js       # Configuração principal do Express
<br/>
├── prisma/
<br/>
│   └── schema.prisma   # Definição do modelo de banco de dados
<br/>
│   └── migrations      # Migrações em SQL para ajustar o banco de dados
<br/>
├── index.js            # Arquivo de entrada principal
<br/>
├── .env                # Variáveis de ambiente (não versionar)
<br/>
├── .env.example        # Modelo de .env
<br/>
└── README.md

## MER e Arquivo sobre

<img width="1249" height="550" alt="image" src="https://github.com/user-attachments/assets/d2fd0c2d-1303-4182-acdf-c7cc1e915044" />

[Modelagem MER - Sistema de Aluguel de Livros 2025.2.pdf](https://github.com/user-attachments/files/24647086/Modelagem.MER.-.Sistema.de.Aluguel.de.Livros.2025.2.pdf)

## Participantes

<table><tr>
    <td colspan=3>
      <h1 align=center>Integrantes do grupo:</h1>
    </td>
  </tr>
  <tr></tr>
  <tr>
    <td align=center> 
      <h3>Gustavo Nepomuceno</h3>
      <p><em>554728</em></p>
    </td>
    <td></td>
    <td align=center>
      <h3>Ana Letícia de Sousa</h3>
      <p><em>555876</em></p>
    </td>
  </tr>
  <tr></tr>
  <tr>
    <td align=center>
      <h3>Samya Soares</h3>
      <p><em>555126</em></p>
    </td>
    <td align=center> 
      <h3>Lorenna Aguiar</h3>
      <p><em>553958</em></p>
    </td>
    <td align=center>
      <h3>Davi Lisboa</h3>
      <p><em>553865</em></p>
    </td>
  </tr>
</table>
