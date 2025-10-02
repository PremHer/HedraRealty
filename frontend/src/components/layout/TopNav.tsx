import { NavLink, useLocation } from "react-router-dom";
import {
  FiBriefcase,
  FiChevronDown,
  FiDownloadCloud,
  FiHome,
  FiLayers,
  FiMoon,
  FiSun,
  FiUser,
  FiUsers
} from "react-icons/fi";
import { useState } from "react";

import { useTheme } from "../../theme/ThemeContext";
import styles from "./TopNav.module.css";

type NavChild = { label: string; to: string };

type NavItem = {
  label: string;
  to?: string;
  icon: React.ReactNode;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: <FiHome /> },
  { label: "Proyectos", to: "/projects", icon: <FiLayers /> },
  { label: "Empresas", to: "/companies", icon: <FiBriefcase /> },
  {
    label: "Personas",
    icon: <FiUsers />,
    children: [
      { label: "Clientes", to: "/people/clients" },
      { label: "Equipo comercial", to: "/people/sales-team" },
      { label: "Usuarios internos", to: "/people/users" }
    ]
  }
];

export function TopNav() {
  const { theme, toggleTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  const ThemeIcon = theme === "light" ? FiMoon : FiSun;

  const handleToggle = (label: string) => {
    setOpenDropdown((current) => (current === label ? null : label));
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.brand}>
        <div className={styles.logo}>HR</div>
        <div className={styles.brandText}>
          <strong>HedraRealty</strong>
          <span>Panel operativo</span>
        </div>
      </div>

      <ul className={styles.links}>
        {navItems.map((item) => {
          if (item.children) {
            const isOpen = openDropdown === item.label;
            const isActive = item.children.some((child) => location.pathname.startsWith(child.to));

            return (
              <li
                key={item.label}
                className={[styles.navItem, isActive ? styles.active : undefined].filter(Boolean).join(" ")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <button
                  type="button"
                  className={styles.dropdownToggle}
                  onClick={() => handleToggle(item.label)}
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {item.label}
                  <FiChevronDown className={styles.chevron} />
                </button>

                <div className={[styles.dropdown, isOpen ? styles.dropdownOpen : undefined]
                  .filter(Boolean)
                  .join(" ")}
                >
                  {item.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        [styles.dropdownLink, isActive ? styles.dropdownLinkActive : undefined]
                          .filter(Boolean)
                          .join(" ")
                      }
                      onClick={() => setOpenDropdown(null)}
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              </li>
            );
          }

          return (
            <li key={item.label} className={styles.navItem}>
              <NavLink
                to={item.to ?? '#'}
                className={({ isActive }) =>
                  [styles.link, isActive ? styles.active : undefined].filter(Boolean).join(" ")
                }
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
              </NavLink>
            </li>
          );
        })}
      </ul>

      <div className={styles.meta}>
        <button
          type="button"
          className={styles.iconButton}
          onClick={toggleTheme}
          aria-label="Cambiar tema"
        >
          <ThemeIcon />
        </button>
        <button type="button" className={styles.iconButton} aria-label="Descargar reporte">
          <FiDownloadCloud />
        </button>
        <div className={styles.avatar} aria-label="Perfil usuario">
          <FiUser />
        </div>
      </div>
    </header>
  );
}
