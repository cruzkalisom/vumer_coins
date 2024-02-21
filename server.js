const express = require('express')
const ejs = require('ejs')
const BodyParser = require('body-parser')

//Armazenando módulo de rots em variáveis
const general = require('./routes/general')

//Criando App
const app = express()

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