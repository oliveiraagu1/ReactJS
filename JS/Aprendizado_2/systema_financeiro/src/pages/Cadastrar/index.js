import React, { useState } from 'react';

import api from '../../config/configApi';

export default function Cadastrar(){

    const [lancamento, setLancamento] = useState({
        nome: "",
        valor: "",
        tipo: "",
        situacao: "",
        dataPagamento: ""
    });

    const [valorLancTarget, setLancTarget] = useState('');

    const [status, setStatus] = useState({
        type: "",
        mensagem: ""
    });

    const valorInput = e => setLancamento({...lancamento, [e.target.name]: e.target.value});

    const valorLancamento = async e => {
        var valorLancamentoInput = e.target.value;
        

        valorLancamentoInput = valorLancamentoInput.replace(/\D/g, "");
        valorLancamentoInput = valorLancamentoInput.replace(/(\d)(\d{2})$/, "$1,$2");
        valorLancamentoInput = valorLancamentoInput.replace(/(?=(\d{3})+(\D))\B/g, ".");

        console.log(valorLancamentoInput);
        setLancTarget(valorLancamentoInput);

        var valorSalvar = await valorLancamentoInput.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");

        setLancamento({...lancamento, valor: valorSalvar});
    }

    const cadLancamento = async e =>{
        e.preventDefault();
        
        const headers = {
            'Content-Type': 'application/json'
        }

        await api.post('/cadastrar', lancamento, {headers})
        .then((response) => {
            setStatus({
                type: 'success',
                mensagem: response.data.mensagem
            })
        }).catch((err) => {
            if(err.response){
                setStatus({
                    type: 'error',
                    mensagem: err.response.data.mensagem
                })
            }else{
                setStatus({
                    type: 'error',
                    mensagem: "Erro: Tente mais tarde!"
                })
            }
        });
    }

    return(
        <div>
            <h1>Cadastrar</h1>
            {status.type === "error" ? <p>{status.mensagem}</p>: ""}
            {status.type === "success" ? <p>{status.mensagem}</p> : ""}
            <form onSubmit={cadLancamento}>
                <label>Nome: </label>
                <input type="text" name="nome" placeholder="Nome do lançamento" onChange={valorInput}/> <br/><br/>

                <label>Valor: </label>
                <input type="text" name="valor" placeholder="Nome do lançamento" onChange={valorLancamento} value={valorLancTarget}/> <br/><br/>

                <label>Tipo: </label>
                <select name="tipo" onChange={valorInput} >
                    <option value="">Selecione</option>
                    <option value="1">Pagamento</option>
                    <option value="2">Recebido</option>
                </select>
                <br/><br/>

                <label>Situação: </label>
                <select  name="situacao" onChange={valorInput} >
                    <option value="">Selecione</option>
                    <option value="1">Pago</option>
                    <option value="2">Pendente</option>
                    <option value="3">Recebido</option>
                </select>

                <br/><br/>

                <label>Data: </label>
                <input type="date" name="dataPagamento" onChange={valorInput}/> <br/><br/>

                <button type="submit">Cadastrar</button>
            </form>
        </div>
    )
}