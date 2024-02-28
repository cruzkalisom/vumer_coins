const express = require('express')
const router = express.Router()
const db = require('../modules/db')
const upload = require('../modules/uploads')
const encode = require('../modules/encode')

router.post('/login', upload.any(), (req, res) => {
    var sql = 'SELECT * FROM users WHERE email = ?'
    var sql2 = 'INSERT INTO sessions (user_id, last_login, remember) VALUES (?, ?, ?)'

    db.query(sql, [req.body.email], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        if(!result[0]){
            return res.json({notemail: true})
        }

        var user_id = result[0].user_id

        encode.bcrypt.compare(req.body.password, result[0].password, (err, success) => {
            if(err){
                return console.log(err.message)
            }

            if(!success){
                return res.json({invalid_password: true})
            }

            var date = new Date().getTime()
            var remember = 0

            if(req.body.remember === 'true'){
                remember = 1
            }

            var database = [
                user_id,
                String(date),
                String(remember)
            ]

            db.query(sql2, database, (err, result) => {
                if(err){
                    return console.log(err.message)
                }

                req.session.token = result.insertId
                req.session.user_id = user_id

                if(!req.session.oldpage || req.session.oldpage == undefined){
                    res.json({status: true, oldpage: '/'})
                } else {
                    res.json({status: true, oldpage: req.session.oldpage})
                }
            })
        })
    })
})

router.get('/login', (req, res) => {
    var sql = 'SELECT * FROM sessions WHERE token = ?'

    if(req.session.token || req.session.token != undefined){
        db.query(sql, [req.session.token], (err, result) => {
            if(err){
                return console.log(err.message)
            }

            if(result[0] && result[0].user_id === req.session.user_id){
                if(!req.session.oldpage || req.session.oldpage == undefined){
                    res.redirect('/')
                } else {
                    res.redirect(req.session.oldpage)
                }
            } else {
                res.render('general/login')
            }
        })
    } else {
        res.render('general/login')
    }
})

router.get('/', (req, res) => {
    req.session.oldpage = '/'
    res.render('index')
})

router.get('/page2', (req, res) => {
    req.session.oldpage = '/page2'
    res.send('Página 2 do nosso projeto ENSINANDO A PROGRAMAR')
})

router.get('/page3', (req, res) => {
    req.session.oldpage = '/page3'
    res.send('Página 3 do Projeto ENSINANDO A PROGRAMAR')
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