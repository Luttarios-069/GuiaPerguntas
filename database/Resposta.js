//CRIAÇÃO MODEL RESPOSTA

const Sequelize = require('sequelize');//importando o sequelize
const conexao = require('./database');//importando a conexão

const Resposta = conexao.define('resposta', {//criando a minha table
    corpo: {//criando colunas da table
        type: Sequelize.TEXT,//typeofs das colunas
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false});//sincronizando meu banco de dados com o sequelize

module.exports = Resposta;//exportando minha tabela