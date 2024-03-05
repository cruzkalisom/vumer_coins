const express = require('express')
const router = express.Router()
const db = require('../modules/db')

router.get('/panel', (req, res) => {
    var sql = 'SELECT * FROM sessions WHERE token = ?' //Seleciona todos os tokens para verificar se a sessão do cliente é válida
    var sql2 = 'SELECT * FROM permissions WHERE user_id = ?' //Seleciona todas as permissões do usuário logado

    if(!req.session.token || req.session.token == undefined){
        return res.send('Você não está logado')
    }

    db.query(sql, [req.session.token], (err, result) => {
        if(err){
            return console.log(err.message)
        }

        if(!result[0]){
            return res.send('Você não está logado')
        }

        if(result[0].user_id != req.session.user_id){
            return res.send('Você não está logado')
        }

        db.query(sql2, [result[0].user_id], (err, result) => {
            if(err){
                return console.log(err.message)
            }

            var permission = false

            for(var i = 0; i < result.length; i++){
                if(result[i].name == 'admin'){
                    permission = true
                    break
                }
            }

            if(!permission){
                return res.send('Você não tem permissão')
            }

            res.render('users/panel')
        })
    })
})

module.exports = router