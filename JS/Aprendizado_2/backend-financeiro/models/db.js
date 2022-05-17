const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('financeiro', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate().then(function(){
    console.log("Conexão com o banco de dados realizadoo com sucesso!")
}).catch(function(err){
    console.log("Erro: Falha ao conectar ao banco de dados! Favor verificar.")
});

module.exports =sequelize;