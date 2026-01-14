// Importa dependências
const express = require("express")
const cors = require("cors")
const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

// Cria instância do Express
const app = express()

// ================= MIDDLEWARES =================
app.use(cors({
  origin: "http://localhost:5173",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ================= ROTAS =================

// Rotas de usuário
const userRoutes = require('./routes/UserRouter')
app.use('/api/v1/users', userRoutes)

// Rotas de cliente
const clientRoutes = require('./routes/cliente.routes.js') // CORRETO
app.use('/api/v1/clients', clientRoutes)

// ================= SWAGGER =================
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API",
      version: "1.0.0",
      description: "API",
      contact: { name: "Gustavonn07" },
    },
    servers: [{ url: "http://localhost:3000" }],
    components: {
      securitySchemes: {
        bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/**/*.js"],
}

const swaggerDocs = swaggerJsDoc(swaggerOptions)
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

// ================= ERROS =================
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Erro interno do servidor")
})

// Confia nos proxies
app.set('trust proxy', true)

// Exporta o app
module.exports = app
