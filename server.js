const express = require('express')
const ejs = require('ejs')
const BodyParser = require('body-parser')
const session = require('express-session')
const delsession = require('./modules/delsession')

var ms = 1*60000

setInterval(delsession, ms)

//Armazenando módulo de rotas em variáveis
const general = require('./routes/general')
const admin = require('./routes/admin')

//Criando App
const app = express()

app.use(session({
    secret: 'jlgashdyougaysdf0u3y',
    resave: true,
    saveUninitialized: true
}))

//TRATANDO DADOS ENVIADOS E RECEBIDOS
app.use(BodyParser.urlencoded({extended:false}))
app.use(BodyParser.json())

//ENGINE
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

//Porta de conexão com o servidor
const port = 50553

//Usando rotas
app.use('/', general)
app.use('/admin', admin)

app.listen(port, () => {
    console.log('Servidor online na porta: ' + port)
})