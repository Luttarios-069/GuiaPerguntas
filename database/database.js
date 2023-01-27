//importando o database
const Sequelize = require('sequelize');

//fazendo a conexão do sequelize com o database
const conexao = new Sequelize('new_guiaperguntas', 'root', '123456', {
    host: 'localhost',//em qual servidor meu banco de dados está rodando
    dialect: 'mysql'//qual o tipo de banco que eu quero me conectar
});

module.exports = conexao;