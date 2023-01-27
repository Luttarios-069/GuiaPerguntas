//CRIAÇÃO DO MODEL

const Sequelize = require('sequelize');//importando o sequelize
const conexao = require('./database');//importando a conexão

const Pergunta = conexao.define('perguntas', {//definindo nome da minha tabela
    titulo:{//criando minhas colunas 
        type: Sequelize.STRING,//definindo os types da tabela
        allowNull: false//não permitindo a coluna ficar vazia
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() => {});//sincronizando meu model com mysql

module.exports = Pergunta;