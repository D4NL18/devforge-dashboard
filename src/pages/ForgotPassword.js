// src/pages/ForgotPassword.js
import React, { useState } from 'react';
import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Password recovery requested for: ${email}`);
        alert('Um e-mail foi enviado para recuperação de senha.');
    };

    return (
        <div className={styles.forgotPasswordContainer}>
            <div className={styles.forgotPasswordBox}>
                <h2>Recuperar Senha</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Enviar</button>
                </form>
                <p>
                    <a href="/login">Voltar ao login</a>
                </p>
            </div>
        </div>
    );
};

export default ForgotPassword;