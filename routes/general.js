const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const upload = require('../modules/uploads')
const encode = require('../modules/encode')

router.post('/login', upload.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        if(!result[0]){
            return res.json({notemail: true})
        }

        encode.bcrypt.compare(req.body.password, result[0].password, (err, success) => {
            if(err){
                return console.log(err.message)
            }

            if(!success){
                return res.json({invalid_password: true})
            }

            if(!req.session.teste || req.session.teste == undefined){
                res.json({status: true, oldpage: '/'})
            } else {
                console.log(req.session.teste)
                res.json({status: true, oldpage: req.session.oldpage})
            }
            
        })
    })
})

router.get('/login', (req, res) => {
    res.render('general/login')
})

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/page2', (req, res) => {
    req.session.oldpage = '/page2'
    req.session.teste = 'Esse é um teste de informações salvo dentro das sessões'
    res.send('Página 2 do nosso projeto ENSINANDO A PROGRAMAR')
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

        var hashcode = encode.encodePassowd(req.body.password)

        var database = [
            req.body.email,
            hashcode,
            req.body.name
        ]

        db.query(insert_user, database, (err) => {
            if(err){
                return console.log(err.message)
            }

            if(!req.session.oldpage || req.session.oldpage == undefined){
                res.json({status: true, oldpage: '/'})
            } else {
                res.json({status: true, oldpage: req.session.oldpage})
            }
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