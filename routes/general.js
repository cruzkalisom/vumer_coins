const express = require('express')
const router = express.Router()
const db = require('../modules/db')

router.get('/', (req, res) => {
    res.send('Página Inicial do sitema de gestão de carteira cripto')
})

router.get('/login/:email', (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'
    db.query(sql, [req.params.email], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        res.send('Sucesso até aqui')
    })
})

module.exports = router