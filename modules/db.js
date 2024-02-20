const db = require('mysql')

var connect = db.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'vmr_coins'
})

connect.connect((err) => {
    if(err){
        return console.log('Erro de conexão com o banco de dados: ' + err)
    }

    console.log('Conexão com o banco de dados bem sucedida!')
})

module.exports = connect