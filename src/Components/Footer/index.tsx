import styles from './index.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Meu Dashboard</p>
    </footer>
  );
};

export default Footer;
