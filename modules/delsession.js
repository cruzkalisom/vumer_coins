var db = require('./db')

var delete_sessions = () => {
    var sql = 'SELECT * FROM sessions'
    var sql2 = 'DELETE FROM sessions WHERE token = ?'

    var date = new Date().getTime()
    var ms24h = 86400000 //24h convertidas em ms para deletar os nossos tokens

    db.query(sql, (err, result) => {
        if(err){
            return console.log(err.message)
        }

        for(var i = 0; i < result.length; i++){
            if(Number(result[i].last_login) + ms24h < date && result[i].remember === '0'){
                db.query(sql2, [result[i].token], (err) => {
                    if(err){
                        return console.log(err.message)
                    }
                })
            }
        }
    })
}

module.exports = delete_sessions