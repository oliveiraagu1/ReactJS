const Sequelize = require('sequelize');
const db = require('./db');

const Lancamentos = db.define('lancamentos', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },//Tipo 1: Pagamento / Tipo 2: Recebido
    tipo:{
        type: Sequelize.INTEGER,
        allowNull: false
    },//Tipo 1: Pago / Tipo 2: Pendente
    situacao: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    dataPagamento: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

//Lancamentos.sync();
Lancamentos.sync({alter: true});

module.exports = Lancamentos;