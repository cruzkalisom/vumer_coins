const express = require('express')

//Armazenando módulo de rots em variáveis
const general = require('./routes/general')

//Criando App
const app = express()

//Porta de conexão com o servidor
const port = 50553

app.use('/', general)

app.get('/rotaqualquer', (req, res) => {
    res.send('ROTA QUALQUER QUE EU CRIEI')
})

app.listen(port, () => {
    console.log('Servidor online na porta: ' + port)
})