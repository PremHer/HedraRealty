import { NavLink } from 'react-router-dom';

import styles from './Sidebar.module.css';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: '??' },
  { label: 'Proyectos', to: '/projects', icon: '???' },
  { label: 'Lotes', to: '/lots', icon: '??' }
];

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.brand}>
        <span className={styles.logo}>HR</span>
        <div>
          <strong>HedraRealty</strong>
          <small>Control Operativo</small>
        </div>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.active : undefined]
                .filter(Boolean)
                .join(' ')
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className={styles.meta}>
        <span className={styles.metaTitle}>Proyecto activo</span>
        <strong>Residencial Luna Azul</strong>
        <p>15% avance comercial · 10% obra</p>
      </div>
    </aside>
  );
}
