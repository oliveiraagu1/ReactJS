const express = require('express');
const cors = require('cors');
const app = express();
const {Op} = require('sequelize')

const Lancamentos = require('./models/Lancamentos');

app.use(express.json());

app.use(function(req,res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization");
    app.use(cors());
    next();
});


app.get('/listar/:mes/:ano', async function (req, res) {

    var mes = new Number(req.params.mes);
    var ano = new Number(req.params.ano);

    const date = new Date(ano + "-" + mes);
    var primeiroDia = new Date(date.getFullYear(), date.getMonth(), 1);
    var ultimoDia = new Date(date.getUTCFullYear(), date.getMonth() + 1, 0);

    const lancamentos = await Lancamentos.findAll({ 
        order: [['dataPagamento', 'ASC']],
        where: {
            "dataPagamento": {
                [Op.between]: [primeiroDia, ultimoDia]
            }
        }
    });

    const valorPagamento = await Lancamentos.sum('valor', {
        where: {
            tipo: '1',
            "dataPagamento":{
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    });

    const valorRecebido = await Lancamentos.sum('valor', {
        where: {
            tipo: '2',
            "dataPagamento":{
                [Op.between]: [primeiroDia, ultimoDia],
            }
        }
    });

    const saldo = new Number(valorRecebido) - new Number(valorPagamento)

    return res.json({
        erro: false,
        lancamentos,
        valorPagamento,
        valorRecebido,
        saldo
    })
});

app.post('/cadastrar', async function (req, res) {
    await Lancamentos.create(req.body).then(function () {
        return res.json({
            erro: false,
            mensagem: "Lançamento cadastrado com sucesso"
        });
    }).catch(function () {
        return res.status(400).json({
            erro: true,
            mensagem: "Erro: Lançamento não foi cadastrado"
        })
    })
});

app.listen(8080, function () {
    console.log("Servidor iniciado na porta 8080: http://localhost:8080");
});

