import React, { useState, useContext } from 'react';

import { useHistory } from 'react-router-dom';

import { Container, FormLogin, Titulo, Input, ButtomPrimary, AlertDanger, AlertSuccess } from './styles';

import { Context } from '../../Context/AuthContext';

import api from '../../config/configApi';

export const Login = () => {

    const history = useHistory();

    const { signIn } = useContext(Context);

    const [dadosUsuario, setUsuario] = useState({
        usuario: '',
        senha: ''
    });

    const [status, setStatus] = useState({
        type: '',
        messagem: ''
    });

    const valorInput = e => setUsuario({ ...dadosUsuario, [e.target.name]: e.target.value });

    const loginSubmit = async e => {
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json'
        };

        api.post("/login", dadosUsuario, { headers })
            .then((response) => {
                if (response.data.erro) {
                    setStatus({
                        type: 'erro',
                        messagem: response.data.messagem
                    });
                } else {
                    setStatus({
                        type: 'success',
                        messagem: response.data.messagem
                    });
                    // Salvar o token localStorage
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
                    signIn(true);
                    return history.push('/dashboard');
                }
            }).catch(() => {
                setStatus({
                    type: 'erro',
                    messagem: "Erro: Usuário ou senha a senha incorreta!"
                });
            });
    }

    return (
        <Container>
            <FormLogin>
                { /* Titulo da página */}
                <Titulo>Login</Titulo>

                {status.type === 'erro' ? <AlertDanger>{status.messagem}</AlertDanger> : ""}
                {status.type === 'success' ? <AlertSuccess>{status.messagem}</AlertSuccess> : ""}

                <form onSubmit={loginSubmit}>
                    <Input type="text" name="usuario" placeholder="Usuário" onChange={valorInput} />

                    <Input type="password" name="senha" placeholder="Senha" autoComplete="on" onChange={valorInput} />

                    <ButtomPrimary type="submit">Acessar</ButtomPrimary>
                </form>
            </FormLogin>
        </Container>
    );
}