import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import styles from "./index.module.scss";
import { useState } from "react";
import clsx from "clsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(prev => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <button className={styles.iconButton} onClick={toggleMenu}>
          <Menu size={24} />
        </button>

        <div 
          className={styles.logoTitle}
          onClick={() => navigate("/home")}
          style={{ cursor: "pointer" }}
        >
          <img
            src="/assets/DevForge-logo-removebg.png"
            alt="DevForge Logo"
            className={styles.logo}
          />
          <h1 className={styles.title}>Dashboard</h1>
        </div>

        <button className={styles.iconButton} onClick={handleLogout}>
          <LogOut size={24} />
        </button>
      </nav>

      {/* Overlay */}
      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      {/* Sidebar */}
      <aside className={clsx(styles.sidebar, { [styles.open]: menuOpen })}>
        <ul>
          <li onClick={() => { navigate("/home"); closeMenu(); }}>🏠 Home</li>
          <li onClick={() => { navigate("/not-implemented"); closeMenu(); }}>👤 Perfil</li>
          <li onClick={() => { navigate("/components"); closeMenu(); }}>🧩 Componentes</li>
          <li onClick={() => { handleLogout(); closeMenu(); }}>🚪 Sair</li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
