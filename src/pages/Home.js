// src/pages/Home.js
import React from 'react';
import styles from './Home.module.css';

const Home = () => {
    return (
        <div className={styles.homeContainer}>
            <header>
                <h1>Bem-vindo ao Dashboard</h1>
            </header>
            <main>
                <p>Aqui você pode gerenciar suas informações e visualizar relatórios.</p>
            </main>
            <footer>
                <p>&copy; 2023 Dashboard Template</p>
            </footer>
        </div>
    );
};

export default Home;