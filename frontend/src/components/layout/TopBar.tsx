import styles from './TopBar.module.css';

export function TopBar() {
  return (
    <header className={styles.topbar}>
      <div>
        <h1>Panel Operativo</h1>
        <p>Visión consolidada de proyectos y desempeño comercial.</p>
      </div>

      <div className={styles.actions}>
        <button className={styles.primary}>Nuevo proyecto</button>
        <button className={styles.ghost}>Invitar usuario</button>
        <div className={styles.avatar}>GM</div>
      </div>
    </header>
  );
}
