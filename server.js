const express = require('express')
const ejs = require('ejs')
const BodyParser = require('body-parser')
const session = require('express-session')

//Armazenando módulo de rots em variáveis
const general = require('./routes/general')

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

app.use('/', general)

app.listen(port, () => {
    console.log('Servidor online na porta: ' + port)
})