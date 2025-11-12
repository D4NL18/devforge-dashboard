import { useNavigate } from "react-router-dom";
import { Menu, LogOut } from "lucide-react";
import styles from "./index.module.scss";
import { useState } from "react";
import clsx from "clsx";

import { FaHome } from "react-icons/fa";
import { FaTools } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const pages = [
    { name: "Home", path: "/home", icon: FaHome },
    { name: "Projetos", path: "/dashboard/projects", icon: FaTools },
    { name: "Clientes", path: "/dashboard/clients", icon: FaUserAlt },
    {
      name: "Transações",
      path: "/dashboard/transactions",
      icon: GrTransaction,
    },
  ];

  return (
    <>
      <nav className={styles.navbar}>
        <button className={styles.iconButton} onClick={toggleMenu}>
          <Menu size={32} />
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
        </div>

        <button className={styles.iconButton} onClick={handleLogout}>
          <LogOut size={32} />
        </button>
      </nav>

      {menuOpen && <div className={styles.overlay} onClick={closeMenu} />}

      <aside className={clsx(styles.sidebar, { [styles.open]: menuOpen })}>
        <ul>
          <button className={styles.iconButton} onClick={toggleMenu}>
            <Menu size={32} />
          </button>
          {pages.map((page) => (
            <li
              key={page.name}
              onClick={() => {
                navigate(page.path);
                closeMenu();
              }}
            >
              <page.icon style={{ marginRight: "10px" }} />
              {page.name}
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
