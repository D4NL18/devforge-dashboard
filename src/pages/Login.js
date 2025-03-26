import React, { useState } from 'react';
import logo from '../assets/logo.png';
import styles from '../styles/Login.module.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Login attempt: Email=${email}, Password=${password}`);
        alert('Login efetuado com sucesso!');
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <img src={logo} alt="Logo" className={styles.logo} />
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Entrar</button>
                </form>
                <p>
                    <a href="/forgot-password">Esqueci minha senha</a>
                </p>
            </div>
        </div>
    );
};

export default Login;