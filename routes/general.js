const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const upload = require('../modules/uploads')

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('general/register')
}) 

router.post('/register', upload.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'
    var insert_user = 'INSERT INTO users (email, password, name) VALUES (? , ?, ?)'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        if(result[0]){
            return res.json({registered: true})
        }

        var database = [
            req.body.email,
            req.body.password,
            req.body.name
        ]

        db.query(insert_user, database, (err) => {
            if(err){
                return console.log(err.message)
            }

            res.json({status: true})
        }) 
    })
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